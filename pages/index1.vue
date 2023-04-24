<template>
    <div class="chat-container">
        <div class="chat-window">
            <div v-for="message in messages" :key="message.id" class="message">
                <div class="message-content" v-if="message.isMe">{{ message.content }}</div>
                <div class="message-content" v-else>{{ message.content }}</div>
                <div class="message-time">{{ message.time }}</div>
            </div>
        </div>
        <div class="chat-input">
            <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message here...">
            <button @click="sendMessage">Send</button>
        </div>
    </div>
    <NuxtLink to="/chat">chat</NuxtLink>
</template>
<script setup>
import { ref } from 'vue';
import { fetchEventSource } from "@microsoft/fetch-event-source";

const data = {
    id: 1,
    isFirst: true,
    message: '你好',
    systemMessage: 'Hello',
};
const opts = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
};

const messages = ref([
    { id: 1, content: 'Hello!', time: '10:00 AM', isMe: true },
    { id: 2, content: 'How are you?', time: '10:01 AM', isMe: false },
    { id: 3, content: 'I am doing well, thanks!', time: '10:02 AM', isMe: true },
    { id: 4, content: 'I am doing well too, thanks!', time: '10:03 AM', isMe: false },
]);
const newMessage = ref('');

const sendMessage = () => {
    if (newMessage.value.trim() !== '') {
        const newId = messages.value.length + 1;
        const newMessageObj = {
            id: newId,
            content: newMessage.value.trim(),
            time: new Date().toLocaleTimeString(),
            isMe: true,
        };
        const result = ref('')
        const resultMessageObj = {
            id: newId + 1,
            content: result.value,
            time: new Date().toLocaleTimeString(),
            isMe: false,
        }
        messages.value.push(newMessageObj);
        // newMessage.value = '';
        fetchEventSource('http://localhost:8081/create', {
            ...opts,
            onopen(response) {
                if (response.status === 200) {
                    return;
                }
                throw new Error(`Failed to send message. HTTP ${response.status} - ${response.statusText}`);
            },
            onclose() {
                console.log('连接关闭');
                console.log(result);
            },
            onerror(err) {
                throw err;
            },
            onmessage(eventMessage) {
                console.log(eventMessage)
                result.value = eventMessage.data
                const newId = messages.value.length + 1;
                const newMessageObj = {
                    id: newId,
                    content: eventMessage.data,
                    time: new Date().toLocaleTimeString(),
                    isMe: false,
                };
                messages.value.push(newMessageObj);
            }
        })
    }
};
</script>
<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.chat-window {
    flex: 1;
    overflow-y: scroll;
}

.message {
    display: flex;
    flex-direction: column;
    margin: 10px;
}

.message-content {
    background-color: #eee;
    padding: 10px;
    border-radius: 10px;
}

.message-time {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
}

.chat-input {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
}

.chat-input input {
    flex: 1;
    margin-right: 10px;
    padding: 10px;
    border-radius: 10px;
    border: none;
}

.chat-input button {
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: #007aff;
    color: #fff;
    cursor: pointer;
}

/* @media screen and (max-width: 768px) {
  .chat-window {
    flex: 2;
  }

  .chat-input {
    flex: 1;
  }
} */
</style>

