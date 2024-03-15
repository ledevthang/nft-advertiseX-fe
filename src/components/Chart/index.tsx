import { makeStyles } from '@material-ui/core';
import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TransactionVolume } from 'types/transaction';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value: any) {
          return `${value}$`;
        },
      },
    },
  },
};

const labels = ['All Marketplaces', 'Opensea', 'LooksRare', 'Solanart'];

interface IData {
  volume: TransactionVolume;
}

const BarChart = ({ volume }: IData) => {
  const classes = useStyles();

  const renderData = useMemo(() => {
    const total = volume.opensea + volume.solanart + volume.looksrare;
    return [total, volume.opensea, volume.looksrare, volume.solanart];
  }, [volume]);

  const data = {
    labels,
    datasets: [
      {
        borderWidth: 1,
        barThickness: 60,
        data: renderData,
        backgroundColor: ['#100113', '#53C8E3', '#79E353', '#EA5FE8'],
      },
    ],
  };

  return <Bar options={options} data={data} className={classes.main} />;
};

export default BarChart;

const useStyles = makeStyles((theme) => ({
  main: {
    // width: '75% !important',
  },
}));
