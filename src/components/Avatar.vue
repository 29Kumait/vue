<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAvatar } from '../composables/useAvatar'
import { useNotificationStore } from '../stores/useNotificationStore'

const props = defineProps({
  path: { type: String, default: '' },
  size: { type: Number, default: 5 },
})

const emit = defineEmits<{
  (e: 'upload'): void;
  (e: 'update:path', value: string): void;
}>()

const notificationStore = useNotificationStore()
const { uploading, imageUrl, downloadImage, uploadAvatar } = useAvatar()

// Keep track of local file selection
const files = ref<FileList | null>(null)

// Watch the incoming prop "path"
watch(
  () => props.path,
  (newPath) => {
    if (newPath) {
      downloadImage(newPath)
    } else {
      imageUrl.value = ''
    }
  },
  { immediate: true }
)

async function handleFileChange(evt: Event) {
  const inputEl = evt.target as HTMLInputElement
  files.value = inputEl.files
  try {
    if (!files.value || !files.value.length) {
      throw new Error('No file selected')
    }
    const newFile = files.value[0]
    const path = await uploadAvatar(newFile)
    // Emit new path back to parent
    emit('update:path', path)
    emit('upload')
  } catch (err) {
    notificationStore.addNotification('error', (err as Error).message)
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-4 px-4 py-4 ">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Avatar"
      class="inline-block size-10 rounded-full ring-2 ring-white"
      :style="{ height: props.size + 'em', width: props.size + 'em' }"
    />
    <div
      v-else
      class="avatar no-image gradient-card flex items-center justify-center"
      :style="{ height: props.size + 'em', width: props.size + 'em' }"
    >
      <span class="text-sm">+ &nbsp;</span>
    </div>

    <div>
      <label
        for="avatarInput"
        class="px-4 py-2 cursor-pointer button primary block bg-p3-orange text-white rounded transition-all duration-500 ease-fluid hover:bg-p3-yellow focus:outline-none ease-snappy"
      >
        {{ uploading ? 'Uploading ...' : '+ &nbsp; Image' }}
      </label>
      <input
        style="visibility: hidden; position: absolute;"
        type="file"
        id="avatarInput"
        accept="image/*"
        @change="handleFileChange"
        :disabled="uploading"
      />
    </div>
  </div>
</template>