<template>
  <div class="row justify-content-center mt-5">
    <FeatureCard
        v-for="(feature, index) in features"
        :key="index"
        :title="feature.title"
        :description="feature.description"
        :icon="feature.icon"
        :link="feature.link"
    />
  </div>
</template>

<script>
import FeatureCard from "./FeatureCard.vue";

export default {
  components: { FeatureCard },
  data() {
    return {
      features: [
        {
          title: "Exercise Tracking",
          description: "Monitor workouts, exercises, and daily physical activity to evaluate progress.",
          icon: "bi bi-activity",
          link: "/exercise",
        },
        {
          title: "Health Tracking",
          description: "Set personalized health goals and track progress over time.",
          icon: "bi bi-bar-chart-line",
          link: "/health",
        },
        {
          title: "Screen Time Tracking",
          description: "Track daily screen time, set limits, and promote healthier digital habits.",
          icon: "bi bi-phone",
          link: "/screentime",
        },
        {
          title: "Sleep Tracking",
          description: "Record sleep duration and quality while setting goals for better sleep habits.",
          icon: "bi bi-moon",
          link: "/sleep",
        },
        {
          title: "Diet Tracking",
          description: "Set meal goals, log actual meals, track performance and get recommendations.",
          icon: "bi bi-cup-straw",
          link: "/diet",
        },
        {
          title: "Water Intake Tracking",
          description: "Set water intake goals, log consumption, and evaluate hydration performance.",
          icon: "bi bi-droplet",
          link: "/water",
        },
        {
          title: "Mental Health Tracking",
          description: "Set mental health goals, log and track performance",
          icon: "bi bi-emoji-smile",
          link: "/mentalhealth",
        },
        {
          title: "Walk Tracking",
          description: "Set walking targets (steps), log actual steps, and measure performance.",
          icon: "bi bi-person-walking",
          link: "/walk",
        },
      ],
    };
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
