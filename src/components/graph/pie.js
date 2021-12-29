import { Fragment } from "react";
import { Pie } from "@ant-design/charts";
export function GraphPie() {

        var data = [
          {
            type: 'Planchado y Pintura',
            value: 27,
          },
          {
            type: 'Mantenimiento',
            value: 25,
          },
          {
            type: 'Cambio de Aceite',
            value: 18,
          },
          {
            type: 'Reparacion de Frenos',
            value: 15,
          },
          {
            type: 'Direccion y Suspension',
            value: 10,
          },
          {
            type: 'Diagnostico de Motor',
            value: 5,
          },
        ];
        var config = {
          appendPadding: 10,
          data: data,
          angleField: 'value',
          colorField: 'type',
          radius: 0.75,
          label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
          },
          interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        };
  return (
    <Fragment>
      <Pie {...config} />
    </Fragment>
  );
}
