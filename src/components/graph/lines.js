import { Fragment } from "react";
import { Line } from "@ant-design/charts";
export function GraphLines() {
  const data = [
    {
      year: "Lunes",
      value: 30,
    },
    {
      year: "Martes",
      value: 40,
    },
    {
      year: "Miercoles",
      value: 35,
    },
    {
      year: "Jueves",
      value: 50,
    },
    {
      year: "Viernes",
      value: 11,
    },
    {
      year: "Sabado",
      value: 60,
    },
  ];

  const config = {
    data,
    yField: "value",
    xField: "year",
    tooltip: {
      customContent: (title, items) => {
        return (
          <>
            <h5 style={{ marginTop: 16 }}>{title}</h5>
            <ul style={{ paddingLeft: 0 }}>
              {items?.map((item, index) => {
                const { name, value, color } = item;
                return (
                  <li
                    key={item.year}
                    className="g2-tooltip-list-item"
                    data-index={index}
                    style={{
                      marginBottom: 4,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="g2-tooltip-marker"
                      style={{ backgroundColor: color }}
                    ></span>
                    <span
                      style={{
                        display: "inline-flex",
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ margiRight: 16 }}>{name}:</span>
                      <span className="g2-tooltip-list-item-value">
                        {value}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        );
      },
    },
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#2593fc",
        lineWidth: 2,
      },
    },
  };
  return (
    <Fragment>
      <Line {...config} />
    </Fragment>
  );
}
