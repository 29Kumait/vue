<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { supabase } from '../supabase'

interface AvatarProps {
  path?: string
  size?: number
}

const props = defineProps<AvatarProps>()

const emit = defineEmits(['upload', 'update:path'])

const pathRef = computed(() => props.path || '') // fallback to empty string
const size = computed(() => props.size ?? 5)     // fallback to 5 if not given

const uploading = ref(false)
const src = ref('')
const files = ref<FileList | null>(null)

// Download image from supabase
async function downloadImage(filePath: string) {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(filePath)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (err) {
    const error = err as Error
    console.error('Error downloading image: ', error.message)
  }
}

// Watch for changes in pathRef, re-download image if it changes
watch(
  () => pathRef.value,
  (newPath) => {
    if (newPath) {
      downloadImage(newPath)
    } else {
      src.value = ''
    }
  },
  { immediate: true } 
)

async function uploadAvatar(evt: Event) {
  const inputEl = evt.target as HTMLInputElement
  files.value = inputEl.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
    if (uploadError) throw uploadError

    // Emit the new path back to the parent so it can update
    emit('update:path', filePath)
    emit('upload')
  } catch (err) {
    const error = err as Error
    alert(error.message)
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-4 px-4 py-4 glow-effect">
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar image rounded-full shadow-md"
      :style="{ height: size + 'em', width: size + 'em' }"
    />
    <div
      v-else
      class="avatar no-image gradient-card flex items-center justify-center"
      :style="{ height: size + 'em', width: size + 'em' }"
    >
      <span class="text-sm">No Image</span>
    </div>

    <div :style="{ width: size + 'em' }">
      <label
        for="single"
        class="cursor-pointer button primary block px-4 py-2 bg-neon-springgreen text-white font-semibold rounded-md shadow-sm hover:bg-neon-lime focus:outline-none transition-all ease-snappy"
      >
        {{ uploading ? 'Uploading ...' : 'Upload Image' }}
      </label>
      <input
        style="visibility: hidden; position: absolute;"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
  </div>
</template>
