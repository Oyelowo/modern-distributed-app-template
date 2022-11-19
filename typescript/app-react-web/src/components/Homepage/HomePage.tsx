import { Container, SimpleGrid, useMantineTheme } from "@mantine/core";
import { useChart } from "../../charts/echarts/useChart.tsx";
import ReactEcharts from "../../charts/echarts/ReactEcharts.tsx";
import { tradingChartOption } from "../../charts/echarts/StockChartTA.ts";
import { multiChartOptions } from "../../charts/echarts/chartMulti.tsx";
import { useCandleChart } from "../../charts/echarts/useCandleChart.tsx";

const HomePage = () => {
  const { colorScheme } = useMantineTheme();
  const theme = colorScheme === "dark" ? "dark" : "vintage";

  const { ReactCharts: TAChart } = useChart({
    option: tradingChartOption,
    theme,
  });
  const { CandleStickCharts } = useCandleChart({ theme });

  const { ReactCharts: MultiChart, chart: _ } = useChart({
    option: multiChartOptions,
    theme,
  });
  // chart?.showLoading()

  return (
    <>
      <Container>
        <SimpleGrid
          style={{ minHeight: "60vh" /* height: 'calc(100vh - 300px)'  */ }}
          my="lg"
        >
          <ReactEcharts theme={theme} />
        </SimpleGrid>
        <SimpleGrid style={{ minHeight: "60vh" }} my="lg">
          <CandleStickCharts />
        </SimpleGrid>
        <SimpleGrid style={{ minHeight: "60vh" }} my="lg">
          <MultiChart />
        </SimpleGrid>
        <SimpleGrid style={{ minHeight: "60vh" }} my="lg">
          <TAChart />
        </SimpleGrid>
      </Container>
    </>
  );
};

export default HomePage;
