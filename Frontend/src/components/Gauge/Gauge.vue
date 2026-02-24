<script setup>
import { computed } from "vue";

const props = defineProps({
  spent: { type: Number, default: 0 },
  budget: { type: Number, default: 0 },
});

// Compute percentage safely
const percent = computed(() => {
  const spent = Number(props.spent) || 0;
  const budget = Number(props.budget) || 0;

  // Avoid division by zero
  return budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
});

// Make series reactive for ApexCharts
const series = computed(() => [percent.value]);

const options = {
  chart: { type: "radialBar", sparkline: { enabled: false } },
  grid: { padding: { top: 0, bottom: 0, left: 0, right: 0 } },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#6f5de7"],
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -120,
      endAngle: 120,
      hollow: { size: "70%" },
      track: { background: "#292929", strokeWidth: "100%", margin: 0 },
      dataLabels: {
        name: { show: false },
        value: {
          show: false,
          fontSize: "22px",
          fontFamily: "DM Sans",
          fontWeight: "600",
          color: "#fff",
          formatter: (val) => `${Math.round(val)}%`,
        },
      },
    },
  },
  stroke: { lineCap: "round" },
  colors: ["#a293e6"],
};
</script>

<template>
  <apexchart
    type="radialBar"
    :options="options"
    :series="series"
    height="100%"
    width="100%"
  />
</template>
