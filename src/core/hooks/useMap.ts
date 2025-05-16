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
            console.info('[useMap]: Topology data was successfully loaded.');
        });
    }, []);

    // Create the map
    useEffect(() => {
        if (!featureCollection) {
            console.info('[useMap]: No topology data available yet...');
            return;
        }

        const { width, height } = mapElement.current.getBoundingClientRect();

        /* Create a projection that leaves 5% padding on every side */
        const geoProjection = d3.geoMercator()
            .fitExtent([[width * 0.05, height * 0.05], [width * 0.95, height * 0.95]], featureCollection);

        const geoPath = d3.geoPath()
            .projection(geoProjection)
            .digits(3);

        const svg = d3.select(mapElement.current).append('svg')
            .attr('height', '100%')
            .attr('width', '100%')
            .style('display', 'block');

        const g = svg.append('g');

        /* Creating a zoom behavior and attaching it to the svg */
        const zoomBehavior = d3.zoom();
        svg.call(zoomBehavior as any);

        /* Zoom events are detected at the svg level, and its handler applies the transform to the g element */
        zoomBehavior.scaleExtent([1, 10]);
        zoomBehavior.translateExtent([[0, 0], [width, height]]);
        zoomBehavior.on('zoom', function({ transform }) {
            g.attr('transform', transform);
        });

        // Bind every feature (municipality) to a path element
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

        // Append a graticule to the map
        // const graticule = d3.geoGraticule().step([0.325, 0.25]);
        // g.datum(graticule())
        //     .attr('d', geoPath)
        //     .attr('pointer-events', 'none')
        //     .attr('fill', 'none')
        //     .attr('stroke', '#777')
        //     .attr('stroke-width', '.5px')
        //     .attr('stroke-opacity', 0.5);

        return () => {
            console.info('[useMap]: Cleaning up the map.');
            d3.select(mapElement.current).selectAll('*').remove();
        };
    }, [featureCollection]);


    function addMarkedMunicipality(id: number) {
        const svg = d3.select(mapElement.current).select('svg');
        const g = svg.select('g');
        const target = g.selectAll('path').filter((_, index: number) => index === id);

        target.transition()
            .duration(500)
            .attr('fill', (datum: any) => getDistrictColor(datum.properties.NAME_1));
    }

    function setMarkedMunicipalities(ids: number[]) {
        const svg = d3.select(mapElement.current).select('svg');
        const g = svg.select('g');

        // Marked municipalities
        const markedTargets = g.selectAll('path').filter((_, index: number) => ids.includes(index));

        markedTargets.transition()
            .duration(500)
            .attr('fill', '#79adbc')
            .attr('stroke-width', 0.5);

        markedTargets
            .on('mouseover', function(event: any, datum: any) {
                const target: SVGPathElement = event.target;

                target.setAttribute('cursor', 'pointer');
                target.setAttribute('fill', '#66cbe9');
                target.setAttribute('stroke-width', '0.75');

                console.log('mouseover', datum.properties.NAME_2, event);
            })
            .on('mouseout', function(event: any) {
                const target: SVGPathElement = event.target;

                target.setAttribute('cursor', 'default');
                target.setAttribute('fill', '#79adbc');
                target.setAttribute('stroke-width', '0.5');
            });

        // Unmarked municipalities
        const unmarkedTargets = g.selectAll('path').filter((_, index: number) => !ids.includes(index));

        unmarkedTargets.transition()
            .duration(500)
            .attr('fill', DEFAULT_COLOR)
            .attr('stroke-width', 0.25);

        unmarkedTargets.on('mouseover', null);
        unmarkedTargets.on('mouseout', null);
    }

    function zoomToMunicipality(id: number) {
        if (!mapElement.current) return;
        if (!zoomBehaviorRef.current) return;
        if (!geoPathRef.current) return;

        // TODO: extract svg to a variable, g as well?
        const svg = d3.select(mapElement.current).select('svg');
        const g = svg.select('g');
        const target = g.selectAll('path').filter((_, index: number) => index === id);

        const [[x0, y0], [x1, y1]] = geoPathRef.current.bounds(target.datum() as any);

        const { width, height } = mapElement.current.getBoundingClientRect();
        const targetWidth = x1 - x0;
        const targetHeight = y1 - y0;
        const scale = Math.min(5, 0.5 / Math.max((targetWidth) / width, (targetHeight) / height));

        const transform = d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale)
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2);

        svg.transition()
            .duration(1000)
            .call(zoomBehaviorRef.current.transform as any, transform);
    }

    function zoomToMunicipalities(ids: number[]) {
        if (!mapElement.current) return;
        if (!zoomBehaviorRef.current) return;
        if (!geoPathRef.current) return;

        const svg = d3.select(mapElement.current).select('svg');
        const g = svg.select('g');
        const targets = g.selectAll('path').filter((_, index: number) => ids.includes(index));

        let x0 = Infinity;
        let y0 = Infinity;
        let x1 = -Infinity;
        let y1 = -Infinity;

        targets.each((target: any) => {
            const [[fx0, fy0], [fx1, fy1]] = geoPathRef.current!.bounds(target);
            x0 = Math.min(x0, fx0);
            y0 = Math.min(y0, fy0);
            x1 = Math.max(x1, fx1);
            y1 = Math.max(y1, fy1);
        });

        const { width, height } = mapElement.current.getBoundingClientRect();
        const targetWidth = x1 - x0;
        const targetHeight = y1 - y0;
        const scale = Math.min(3, 0.9 / Math.max((targetWidth) / width, (targetHeight) / height));

        /* Apply the transform to the svg element */
        const transform = ids.length === 0
            ? d3.zoomIdentity
            : d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(scale)
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2);

        svg.transition()
            .duration(500)
            .call(zoomBehaviorRef.current.transform, transform);
    }

    const resetView = () => {
        const svg = d3.select(mapElement.current).select('svg');
        svg.transition().call(
            zoomBehaviorRef.current?.transform as any,
            d3.zoomIdentity,
        );

        // FIXME: This is a workaround to recalculate the projection when view height and width change
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
        zoomToMunicipality,
        zoomToMunicipalities,
        resetView,
    };
}