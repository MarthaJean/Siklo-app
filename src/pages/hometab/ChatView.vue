<template>
  <InnerLayoutWrapper>
    <template #content>
      <v-container fluid class="pa-0">
        <section class="chat-section">
          <v-container>
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="d-flex align-center">
                <v-btn
                  variant="text"
                  prepend-icon="mdi-arrow-left"
                  class="me-2"
                  @click="goBack"
                >
                  Back
                </v-btn>
                <h2 class="text-h5 font-weight-bold">Chat with Suppliers</h2>
              </div>
              <v-chip color="primary" variant="tonal" size="small">
                {{ conversations.length }}
                {{ conversations.length === 1 ? "Chat" : "Chats" }}
              </v-chip>
            </div>

            <v-row>
              <v-col cols="12" md="5">
                <v-card class="chat-list" variant="outlined">
                  <v-list density="comfortable">
                    <v-list-item
                      v-for="conversation in conversations"
                      :key="conversation.id"
                      @click="selectConversation(conversation.id)"
                      :active="activeConversationId === conversation.id"
                    >
                      <template v-slot:prepend>
                        <v-avatar size="40" color="primary" variant="tonal">
                          <v-icon icon="mdi-account" />
                        </v-avatar>
                      </template>
                      <v-list-item-title class="text-body-2 font-weight-bold">
                        {{ conversation.supplier }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-caption">
                        {{ conversation.lastMessage }}
                      </v-list-item-subtitle>
                      <template v-slot:append>
                        <v-chip
                          v-if="conversation.unread > 0"
                          color="primary"
                          size="x-small"
                        >
                          {{ conversation.unread }}
                        </v-chip>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>

              <v-col cols="12" md="7">
                <v-card class="chat-window" variant="outlined">
                  <v-card-title class="text-subtitle-1 font-weight-bold">
                    {{
                      activeConversation?.supplier || "Select a conversation"
                    }}
                  </v-card-title>
                  <v-card-subtitle v-if="activeItem" class="text-caption">
                    About: {{ activeItem.title }}
                  </v-card-subtitle>
                  <v-divider />
                  <v-card-text class="chat-messages">
                    <div
                      v-if="!activeConversation"
                      class="text-medium-emphasis"
                    >
                      Choose a supplier to start chatting.
                    </div>
                    <div v-else>
                      <div
                        v-for="(message, index) in activeConversation.messages"
                        :key="index"
                        class="mb-3"
                      >
                        <div
                          class="text-caption text-medium-emphasis mb-1"
                          :class="
                            message.from === 'me' ? 'text-right' : 'text-left'
                          "
                        >
                          {{
                            message.from === "me"
                              ? "You"
                              : activeConversation.supplier
                          }}
                        </div>
                        <v-sheet
                          :class="
                            message.from === 'me'
                              ? 'message-outgoing'
                              : 'message-incoming'
                          "
                          class="pa-3"
                        >
                          {{ message.text }}
                        </v-sheet>
                      </div>
                    </div>
                  </v-card-text>
                  <v-divider />
                  <v-card-actions class="pa-4">
                    <v-text-field
                      v-model="draft"
                      placeholder="Type a message"
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="flex-grow-1"
                    />
                    <v-btn color="primary" variant="elevated"> Send </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </section>
      </v-container>
    </template>
  </InnerLayoutWrapper>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import InnerLayoutWrapper from "@/layouts/InnerLayoutWrapper.vue";
import { recommendations } from "@/pages/hometab/data/recommendationsData";

type ChatMessage = {
  from: "me" | "supplier";
  text: string;
};

type Conversation = {
  id: string;
  supplier: string;
  lastMessage: string;
  unread: number;
  messages: ChatMessage[];
};

const route = useRoute();
const router = useRouter();
const conversations = ref<Conversation[]>([]);

const activeConversationId = ref<string | null>(null);
const draft = ref("");

const activeItem = computed(() => {
  const selectedId = route.query.item;
  if (typeof selectedId !== "string") return null;
  return recommendations.find((item) => item.id === selectedId) || null;
});

const buildConversations = (): Conversation[] => {
  if (activeItem.value) {
    return [
      {
        id: `supplier-${activeItem.value.id}`,
        supplier: activeItem.value.seller,
        lastMessage: `Thanks for your interest in ${activeItem.value.title}.`,
        unread: 1,
        messages: [
          {
            from: "supplier",
            text: `Thanks for your interest in ${activeItem.value.title}.`,
          },
          {
            from: "me",
            text: "Hi, I want to confirm availability and volume.",
          },
        ],
      },
    ];
  }

  return recommendations.slice(0, 2).map<Conversation>((item) => ({
    id: `supplier-${item.id}`,
    supplier: item.seller,
    lastMessage: `We have ${item.title} ready for pickup.`,
    unread: 0,
    messages: [
      { from: "supplier", text: `We have ${item.title} ready for pickup.` },
    ],
  }));
};

conversations.value = buildConversations();
activeConversationId.value = conversations.value[0]?.id || null;

const activeConversation = computed(() => {
  return conversations.value.find(
    (conversation) => conversation.id === activeConversationId.value,
  );
});

const selectConversation = (id: string) => {
  activeConversationId.value = id;
};

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};
</script>

<style scoped>
.chat-list,
.chat-window {
  border-radius: 12px !important;
}

.chat-messages {
  min-height: 260px;
}

.message-incoming {
  background: rgba(var(--v-theme-surface-variant), 0.3);
  border-radius: 12px;
}

.message-outgoing {
  background: rgba(var(--v-theme-primary), 0.15);
  border-radius: 12px;
  margin-left: auto;
}
</style>
