import { Fragment } from "react";
import { Bar } from "@ant-design/charts";
export function GraphSeries() {
    let data = [
        {
          label: 'Lun.',
          type: 'Originales',
          value: 2800,
        },
        {
          label: 'Lun.',
          type: 'Ajustadas',
          value: 2260,
        },
        {
          label: 'Mar.',
          type: 'Originales',
          value: 1800,
        },
        {
          label: 'Mar.',
          type: 'Ajustadas',
          value: 1300,
        },
        {
          label: 'Mie.',
          type: 'Originales',
          value: 950,
        },
        {
          label: 'Mie.',
          type: 'Ajustadas',
          value: 900,
        },
        {
          label: 'Jue.',
          type: 'Originales',
          value: 500,
        },
        {
          label: 'Jue.',
          type: 'Ajustadas',
          value: 390,
        },
        {
          label: 'Vie.',
          type: 'Originales',
          value: 170,
        },
        {
          label: 'Vie.',
          type: 'Ajustadas',
          value: 100,
        },
      ];
      var config = {
        data: data,
        isGroup: true,
        xField: 'value',
        yField: 'label',
        seriesField: 'type',
        dodgePadding: 4,
        intervalPadding: 20,
        label: {
          position: 'middle',
          layout: [
            { type: 'interval-adjust-position' },
            { type: 'interval-hide-overlap' },
            { type: 'adjust-color' },
          ],
        },
      };
  return (
    <Fragment>
      <Bar {...config} />
    </Fragment>
  );
}
