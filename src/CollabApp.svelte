<script lang="ts">
  import { onMount } from 'svelte';

  interface Message {
    id: number;
    user: string;
    text: string;
    time: string;
    avatar: string;
  }

  const STORAGE_KEY = 'cms_chat_messages';
  let messages: Message[] = [];
  let newMessage = '';
  let currentUser = { name: 'Admin User', avatar: 'A' };

  onMount(() => {
    loadMessages();
    const session = localStorage.getItem('cms_session');
    if (session) {
      const user = JSON.parse(session);
      currentUser = { name: user.name, avatar: user.name[0] };
    }

    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) loadMessages();
    });
  });

  function loadMessages() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      messages = JSON.parse(saved);
    } else {
      messages = [
        { id: 1, user: 'System', text: 'Welcome to the Team Hub', time: '09:00', avatar: '⚙' }
      ];
      saveMessages();
    }
  }

  function saveMessages() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }

  function sendMessage() {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now(),
      user: currentUser.name,
      avatar: currentUser.avatar,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    messages = [...messages, msg];
    saveMessages();
    newMessage = '';
  }
</script>

<div class="animate-in">
  <header style="margin-bottom: 2.5rem;">
    <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--primary);">Collaboration</h2>
    <p style="color: var(--text-muted); font-size: 0.9rem;">Real-time sync and team communication</p>
  </header>

  <div class="module-card" style="height: 600px; padding: 0; display: flex; flex-direction: column; background: white; border: 1px solid var(--border);">
    <div style="flex: 1; overflow-y: auto; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem;">
      {#each messages as msg}
        <div style="display: flex; gap: 1rem; {msg.user === currentUser.name ? 'flex-direction: row-reverse' : ''}">
          <div style="width: 32px; height: 32px; background: {msg.user === currentUser.name ? 'var(--primary-accent)' : 'var(--bg-soft)'}; color: {msg.user === currentUser.name ? 'white' : 'var(--text-main)'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0; border: 1px solid var(--border);">
            {msg.avatar}
          </div>
          <div style="max-width: 70%;">
            <div style="display: flex; gap: 0.5rem; align-items: baseline; margin-bottom: 0.25rem; {msg.user === currentUser.name ? 'justify-content: flex-end' : ''}">
              <span style="font-size: 0.75rem; font-weight: 700;">{msg.user}</span>
              <span style="font-size: 0.65rem; color: var(--text-muted);">{msg.time}</span>
            </div>
            <div style="padding: 0.75rem 1rem; background: {msg.user === currentUser.name ? 'var(--bg-soft)' : 'white'}; border: 1px solid var(--border); border-radius: var(--radius); font-size: 0.9rem; line-height: 1.5;">
              {msg.text}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div style="padding: 1.5rem; border-top: 1px solid var(--border); background: var(--bg-soft);">
      <form on:submit|preventDefault={sendMessage} style="display: flex; gap: 1rem;">
        <input 
          bind:value={newMessage}
          placeholder="Write a message..." 
          style="flex: 1; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius); outline: none;"
        />
        <button type="submit" style="background: var(--primary-accent); color: white; border: none; padding: 0 1.5rem; border-radius: var(--radius); font-weight: 600; cursor: pointer;">
          Send
        </button>
      </form>
    </div>
  </div>
</div>
