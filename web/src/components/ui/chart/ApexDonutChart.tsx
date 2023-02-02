// ** MUI Imports

import CardContent from '@mui/material/CardContent';

// ** Third Party Imports
import { ApexOptions } from 'apexcharts';

// ** Component Import
import ReactApexcharts from 'src/components/react-apexcharts';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';

const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#40CDFA',
  series5: '#ffa1a1',
};

const ApexDonutChart = () => {
  // ** Hook
  // const theme = useTheme();
  const { isDarkMode } = useIsDarkMode();

  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: ['Dev Team', 'Partnership', 'Community', 'Sale on InBond'],
    colors: [
      donutColors.series1,
      donutColors.series5,
      donutColors.series3,
      donutColors.series2,
    ],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`,
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: isDarkMode ? '#FFFFFF' : '#000000' },
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem',
            },
            value: {
              fontSize: '1.2rem',
              color: isDarkMode ? '#FFFFFF' : '#000000',
              formatter: (val: string) => `${parseInt(val, 10)}`,
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Total',
              formatter: () => '2600000',
              color: isDarkMode ? '#FFFFFF' : '#000000',
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem',
                  },
                  value: {
                    fontSize: '1rem',
                  },
                  total: {
                    fontSize: '1rem',
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

  return (
    // <Card>
    <>
      {/* <CardHeader
        title="Tokenomic"
        subheader="Tokenomic of project"
        subheaderTypographyProps={{
          sx: { color: (theme) => `${theme.palette.text.disabled} !important` },
        }}
      /> */}
      <div className="text-center text-2xl text-gray-900 dark:text-white">
        Tokenomics
      </div>
      <CardContent>
        <ReactApexcharts
          type="donut"
          height={400}
          options={options}
          series={[400000, 200000, 1000000, 1000000]}
        />
      </CardContent>
    </>
    // </Card>
  );
};

export default ApexDonutChart;
