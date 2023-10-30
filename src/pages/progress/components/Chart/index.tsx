import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./Chart.styled";
import useGetUserLearning from "../../../../hooks/useGetUserLearning";
import dayjs from "dayjs";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { LearningLogRecord } from "../../../../types";
import { useMemo, useState } from "react";

const prepareLearningData = (
  learningLog: LearningLogRecord[],
  period: number
) => {
  const learningData = [];

  for (let i = 0; i < period; i++) {
    const date = dayjs().subtract(i, "day");

    const learned = learningLog.find(
      (record) => record.date === date.format("DDMMYYYY")
    );

    learningData.push({
      date: date.format("MMM DD"),
      "Learned words": learned ? learned.words.length : 0,
    });
  }

  return learningData.reverse();
};

const Chart = () => {
  const [period, setPeriod] = useState(7);
  const learningLog = useGetUserLearning();
  const theme = useTheme();

  const preparedLearningData = useMemo(
    () => prepareLearningData(learningLog, period),
    [learningLog, period]
  );

  if (!preparedLearningData) return;

  return (
    <ChartContainer>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-between"
        pl={{ xs: 2, md: 0 }}
      >
        <Typography variant="h6">Learned words</Typography>
        <Stack direction="row" spacing={1}>
          <Button
            color={period === 7 ? "primary" : "secondary"}
            onClick={() => setPeriod(7)}
          >
            7 days
          </Button>
          <Button
            color={period === 30 ? "primary" : "secondary"}
            onClick={() => setPeriod(30)}
          >
            30 days
          </Button>
        </Stack>
      </Stack>
      <Box flex={1}>
        <ResponsiveContainer>
          <LineChart
            data={preparedLearningData}
            margin={{
              top: 5,
              right: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid stroke="#949494" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Learned words"
              stroke={theme.palette.tertiary.main}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </ChartContainer>
  );
};

export default Chart;
