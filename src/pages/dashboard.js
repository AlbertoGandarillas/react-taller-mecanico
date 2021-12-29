import { Fragment } from "react";
import { GraphLines, GraphSeries, GraphPie } from "../components/graph";
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import "../styles.scss";
export function Dashboard() {
  return (
    <Fragment>
      <div className="dashboard">
        <div>
          <h2>Bienvenido al Sistema Service Auto</h2>
          <p>
          Poseemos mas de 25 años de experiencia en el rubro con las mejores soluciones que requiere para su auto.
        <br/>
        <p>Contactanos</p>
        Av. Nicolas Ayllón #2648 - Ate<br/>
        01 7802020<br/>
        taller@motorexpert.com<br/>
        Dias de Semana: 08:00 a.m. – 12:30 p.m. / 02:15 p.m. – 05:30 p.m. Sábado: 08:00 a.m. – 12:00 p.m. Domingos y feriados: Cerrado              
          </p><br/>
          <div className="site-statistic-demo-card">
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Clientes Satisfechos"
            value={97.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Horas Optimizadas"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>
        </div>
        <div>
          <h2>Cotizaciones Semanal</h2>
          <GraphSeries />
        </div>
        <div>
          <h2>Vehiculos Ingresados</h2>
          <GraphLines />
        </div>
        <div>
          <h2>Ordenes de Reparacion por Servicio</h2>
          <GraphPie />
        </div>
      </div>
    </Fragment>
  );
}
