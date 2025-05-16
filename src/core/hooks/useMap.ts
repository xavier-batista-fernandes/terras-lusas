import { RefObject, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { getDistrictColor } from '../utils/get-district-color.ts';

// TODO: receive an input option determining the map type (districts, municipalities, etc.)
export function useMap(mapElement: RefObject<any>) {

    const DEFAULT_COLOR = 'rgba(198, 198, 198, 0.25)';
    const [featureCollection, setFeatureCollection] = useState<any>();

    const geoPathRef = useRef<d3.GeoPath>(null);
    const geoProjectionRef = useRef<d3.GeoProjection>(null);
    const zoomBehaviorRef = useRef<d3.ZoomBehavior<any, any>>(null);

    // Load the topology data
    useEffect(() => {
        if (!mapElement.current) {
            throw new Error('[useMap]: Could not retrieve map reference from the component\'s view.');
        }

        async function init() {
            const topology: any = await d3.json('/assets/data/municipalities.json');
            setFeatureCollection(topojson.feature(topology, topology.objects.municipalities));
        }

        init().then(() => {
            console.info('[useMap]: Topology loaded');
        });
    }, []);

    // Create the map
    useEffect(() => {
        if (!featureCollection) {
            console.info('[useMap]: No topology data available yet.');
            return;
        }

        const { width, height } = mapElement.current.getBoundingClientRect();

        const geoProjection = d3.geoMercator()
            .fitExtent([[width * 0.05, height * 0.05], [width * 0.95, height * 0.95]], featureCollection);

        const geoPath = d3.geoPath()
            .projection(geoProjection)
            .digits(3);

        const container = d3.select(mapElement.current);

        const svg = container.append('svg')
            .attr('height', '100%')
            .attr('width', '100%')
            .style('display', 'block');

        const g = svg.append('g');
        const zoomBehavior = d3.zoom()
            .scaleExtent([1, Infinity])
            .on('zoom', function(event) {
                const { transform } = event;
                g.attr('transform', transform);
            });
        svg.call(zoomBehavior as any);

        const paths = g.selectAll('path');
        paths.data(featureCollection.features)
            .enter()
            .append('path')
            .attr('d', geoPath as any)
            .attr('fill', DEFAULT_COLOR)
            .attr('stroke', '#000000')
            .attr('stroke-width', 0.25);

        geoProjectionRef.current = geoProjection;
        geoPathRef.current = geoPath;
        zoomBehaviorRef.current = zoomBehavior;

        return () => {
            console.info('[useMap]: Cleaning up the map');
            d3.select(mapElement.current).selectAll('*').remove();
        };
    }, [featureCollection]);


    const addMarkedMunicipality = (id: number) => {
        const svg = d3.select(mapElement.current).select('svg');
        const g = svg.select('g');
        const target = g.selectAll('path').filter((_, index: number) => index === id);

        target.transition()
            .duration(500)
            .attr('fill', (datum: any) => getDistrictColor(datum.properties.NAME_1));
    };

    const setMarkedMunicipalities = (ids: number[]) => {
        const svg = d3.select(mapElement.current).select('svg');
        const g = svg.select('g');

        const markedTargets = g.selectAll('path').filter((_, index: number) => ids.includes(index));
        markedTargets.transition()
            .duration(500)
            .attr('fill', (datum: any) => getDistrictColor(datum.properties.NAME_1));

        const unmarkedTargets = g.selectAll('path').filter((_, index: number) => !ids.includes(index));
        unmarkedTargets.transition()
            .duration(500)
            .attr('fill', DEFAULT_COLOR);
    };

    const utilJumpToMunicipality = (id: number) => {
        const geoPath = geoPathRef.current as any;

        const svg = d3.select(mapElement.current).select('svg');
        const g = svg.select('g');
        const target = g.selectAll('path').filter((_, index: number) => index === id);

        const [[x0, y0], [x1, y1]] = geoPath.bounds(target.datum() as any);

        const { width, height } = mapElement.current?.getBoundingClientRect();
        const targetWidth = x1 - x0;
        const targetHeight = y1 - y0;
        console.log(targetWidth, targetHeight);
        console.log(width, height);
        const scale = Math.min(5, 0.5 / Math.max((x1 - x0) / width, (y1 - y0) / height));
        console.log('scale', scale);

        // Calculate the center of the municipality's bounds


        // Get the current zoom scale
        const currentZoom = d3.zoomTransform(target.node() as any).k;
        console.log('currentZoom', currentZoom);

        const transform = d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale)
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2);

        svg.transition()
            .duration(750)
            .call(
                zoomBehaviorRef.current?.transform as any,
                transform,
            );


        const datum: any = target.datum();
        console.log('Jumping to:', datum.properties.NAME_1);
    };

    const resetView = () => {
        console.log('resetZoom');
        const svg = d3.select(mapElement.current).select('svg');
        svg.transition().duration(750).call(
            zoomBehaviorRef.current?.transform as any,
            d3.zoomIdentity,
        );

        // FIXME: This is a workaround to recalculate the projection
        const { width, height } = mapElement.current.getBoundingClientRect();
        geoProjectionRef.current?.fitExtent(
            [[width * 0.05, height * 0.05], [width * 0.95, height * 0.95]],
            featureCollection,
        );
        geoPathRef.current = d3.geoPath().projection(geoProjectionRef.current).digits(3);
        d3.select(mapElement.current).selectAll('path')
            .attr('d', geoPathRef.current as any);
    };


    return {
        mapElement,
        addMarkedMunicipality,
        setMarkedMunicipalities,
        utilJumpToMunicipality,
        resetView,
    };
}