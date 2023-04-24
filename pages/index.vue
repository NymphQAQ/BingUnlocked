<template>
    <div class="chat">
        <div class="chat-container">
            <div class="chat-header">
                Header
            </div>


            <div class="chat-messages">
                <n-scrollbar style="" trigger="hover">
                    <div v-for="message in messages" :key="message.id"
                        :class="{ 'message-right': message.isMe, 'message-left': !message.isMe }">
                        <div class="message-content">{{ message.content }}</div>
                    </div>
                </n-scrollbar>

            </div>
            <div class="chat-buttom">
                <div class="chat-setting">设置</div>
                <div class="chat-input">
                    <input type="text" v-model="newMessage" @keyup.enter="sendMessage"
                        placeholder="Type your message here...">
                    <button @click="sendMessage">Send</button>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script setup>
import { ref, watch } from 'vue';
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { NScrollbar, NSpace, NInput } from 'naive-ui';


const newMessage = ref('');
const messageContent = ref('');

const messages = ref([
    // { id: 1, content: 'Hello!', time: '10:00 AM', isMe: true },
    // { id: 2, content: 'How are you?', time: '10:01 AM', isMe: false },
    // { id: 3, content: 'I am doing well, thanks!', time: '10:02 AM', isMe: true },
    // { id: 4, content: 'I am doing well too, thanks!', time: '10:03 AM', isMe: false },

]);


watch(() => messages.value, (newValue, oldValue) => {
    console.log(newValue);
}, { deep: true })



function sendMessage() {
    if (newMessage.value.trim() !== '') {
        const data = {
            id: 1,
            isFirst: true,
            message: newMessage.value,
            systemMessage: 'Hello',
        }
        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        messages.value.push({
            id: messages.value.length + 1,
            content: newMessage.value,
            isMe: true
        });
        newMessage.value = '';

        console.log(opts);


        let count = messages.value.length + 1;
        console.log(count);
        messages.value.push({
            id: count,
            content: messageContent.value,
            isMe: false
        });

        // watch(() => messageContent.value, (newValue, oldValue) => {
        //     messages.value[count - 1].content = newValue
        // }, { deep: true })

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
                messageContent.value = ''
            },
            onerror(err) {
                throw err;
            },
            onmessage(eventMessage) {
                console.log(eventMessage)
                // messages.value.push({
                //     id: messages.value.length + 1,
                //     content: messageContent.value,
                //     isMe: false
                // });
                messages.value[count-1].content += eventMessage.data 
                // messageContent.value += eventMessage.data;
                scrollToBottom();

            }
        })
    }
}
function scrollToBottom() {
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}





</script>
  
<style scoped lang="scss">
// * {
//     border: 1px darkgray solid;
// }


.chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    align-items: center;


    .chat-header {
        background-color: rgb(255, 255, 255);
        height: 50px;
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 90px;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
        width: calc(100vw - 40px);
    }


    .chat-messages {
        position: relative;
        display: flex;
        flex-direction: column;
        width: calc(100vw - 40px);
        padding-top: 20px;
        padding-bottom: 20px;
        height: calc(100vh - 180px);
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
        border-radius: 20px;




        .message-right {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
            padding-right: 20px;
        }

        .message-left {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 10px;
            padding-left: 20px;
        }

        .message-content {
            background-color: #eee;
            border-radius: 5px;
            padding: 10px;
            max-width: 70%;
            word-wrap: break-word;
        }
    }

    .chat-buttom {

        display: flex;
        padding: 20px;
        width: 100vw;
        // position: fixed;
        // bottom: 0;

        .chat-setting {
            display: flex;
            width: 60px;
            margin-right: 20px;
            justify-content: center;
            align-items: center;
            border-radius: 18px;
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

        }

        .chat-input {
            display: flex;
            padding: 10px;
            background-color: #f5f5f5;
            position: sticky;
            bottom: 0;
            padding: 10px;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            width: 100%;
            height: 50px;
            opacity: 1;
            border-radius: 90px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

            input {
                flex: 1;
                margin-right: 10px;
                padding: 10px;
                border-radius: 10px;
                border: none;
                // height: 80%;
            }

            button {
                padding: 10px;
                border-radius: 10px;
                border: none;
                background-color: #007aff;
                color: #fff;
                cursor: pointer;
            }
        }
    }

}
</style>
