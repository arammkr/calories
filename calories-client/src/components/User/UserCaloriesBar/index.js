import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
  },
  caloriesChart: {
    height: 400,
  }
}));

export default props => {
  const { meals, caloriesPerDay } = props;

  if (!meals) {
    return null;
  }

  const handleBarClick = ({ indexValue: date }) => {
    props.handleBarClick(date)
  };
  const classes = useStyles();

  return (
    <Paper className={`${classes.paper} ${classes.caloriesChart}`}>
      <ResponsiveBar
        keys={['sum']}
        data={meals}
        indexBy="date"
        padding={0.3}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        colors={meals.map(c => c.color)}
        colorBy="index"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        onClick={handleBarClick}
        axisBottom={{ tickRotation: -40 }}
        markers={[
          {
            axis: 'y',
            value: caloriesPerDay,
            lineStyle: { stroke: 'rgba(0, 0, 0, .35)', strokeWidth: 2 },
            legendOrientation: 'vertical',
          },
        ]}
      />
    </Paper>
  )
}