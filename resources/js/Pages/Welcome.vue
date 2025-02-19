
<template>
  <div class="min-h-screen bg-gradient-to-b from-background to-muted">
    <div class="container max-w-6xl px-4 py-16">
      <div
        class="text-center mb-16"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 600 }"
      >
        <h1 class="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
          Welcome to Visual Automation
        </h1>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create stunning product animations and social media content automatically.
          Let's personalize your experience.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <template v-if="!preferences.primaryColor">
          <div
            class="card-container"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            :transition="{ duration: 600, delay: 200 }"
          >
            <Card class="p-6">
              <h3 class="text-lg font-semibold mb-4">Brand Colors</h3>
              <div class="space-y-4">
                <div>
                  <Label for="primaryColor">Primary Color</Label>
                  <input
                    id="primaryColor"
                    type="color"
                    class="h-10 w-full rounded-md"
                    @input="handlePreferenceChange('primaryColor', $event.target.value)"
                  />
                </div>
                <div>
                  <Label for="secondaryColor">Secondary Color</Label>
                  <input
                    id="secondaryColor"
                    type="color"
                    class="h-10 w-full rounded-md"
                    @input="handlePreferenceChange('secondaryColor', $event.target.value)"
                  />
                </div>
              </div>
            </Card>
          </div>
        </template>

        <template v-if="!preferences.termsAgreed">
          <div
            class="card-container"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            :transition="{ duration: 600, delay: 400 }"
          >
            <Card class="p-6">
              <h3 class="text-lg font-semibold mb-4">Terms & Conditions</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    @update:checked="handlePreferenceChange('termsAgreed', $event)"
                  />
                  <label for="terms" class="text-sm text-muted-foreground">
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>
            </Card>
          </div>
        </template>

        <template v-if="!preferences.facebookAuthorized">
          <div
            class="card-container"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            :transition="{ duration: 600, delay: 600 }"
          >
            <Card class="p-6">
              <h3 class="text-lg font-semibold mb-4">Social Integration</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-2">
                  <Switch
                    id="facebook"
                    @update:checked="handlePreferenceChange('facebookAuthorized', $event)"
                  />
                  <Label for="facebook">Authorize Facebook Posting</Label>
                </div>
                <p class="text-sm text-muted-foreground">
                  Allow us to post generated content directly to your Facebook page
                </p>
              </div>
            </Card>
          </div>
        </template>
      </div>

      <div
        class="mt-16 text-center"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :transition="{ duration: 600, delay: 800 }"
      >
        <button
          class="px-6 py-3 text-white bg-primary rounded-lg hover:bg-opacity-90 transition-colors"
          @click="showWelcomeToast"
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { useMotion } from '@vueuse/motion'
import { useToast } from '@/Composables/useToast'
import Card from '@/Components/UI/Card.vue'
import Label from '@/Components/UI/Label.vue'
import Checkbox from '@/Components/UI/Checkbox.vue'
import Switch from '@/Components/UI/Switch.vue'

const page = usePage()
const toast = useToast()

const preferences = ref({
  primaryColor: null,
  secondaryColor: null,
  termsAgreed: false,
  facebookAuthorized: false
})

onMounted(() => {
  // In a real implementation, this would come from your Laravel backend
  // through Inertia's page props
  const savedPreferences = page.props.preferences || {}
  preferences.value = savedPreferences
})

const handlePreferenceChange = async (key, value) => {
  preferences.value[key] = value
  
  // In a real implementation, you would save to your Laravel backend
  // using Inertia or a direct API call
  try {
    // await $inertia.post('/preferences', { [key]: value })
    toast.success('Preference saved', 'Your settings have been updated.')
  } catch (error) {
    toast.error('Error', 'Failed to save your preference. Please try again.')
  }
}

const showWelcomeToast = () => {
  toast.success('Welcome aboard!', "You're all set to start creating amazing content.")
}
</script>

<style>
.card-container {
  @apply relative;
}

/* Add any additional custom styles here */
</style>
