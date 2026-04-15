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
  <header style="margin-bottom: 3.5rem; display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid var(--border); padding-bottom: 2rem;">
    <div>
      <h2 style="font-size: 2.5rem; font-weight: 900; color: var(--primary); letter-spacing: -0.04em; margin-bottom: 0.5rem;">Collaboration Hub</h2>
      <p style="color: var(--text-muted); font-size: 1.1rem; font-weight: 500;">Real-time communication and team synchronization</p>
    </div>
    <div style="padding-bottom: 0.5rem;">
      <span class="module-tag" style="background: #eef2ff; color: #4f46e5; border-color: #e0e7ff;">Svelte 3.0</span>
    </div>
  </header>

  <div class="module-card" style="height: 600px; padding: 0; display: flex; flex-direction: column; background: var(--bg-main, white); border: 1px solid var(--border); box-shadow: var(--shadow-md);">
    <div style="flex: 1; overflow-y: auto; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem;">
      {#each messages as msg}
        <div style="display: flex; gap: 1rem; {msg.user === currentUser.name ? 'flex-direction: row-reverse' : ''}">
          <div style="width: 36px; height: 36px; background: {msg.user === currentUser.name ? 'var(--primary-gradient)' : '#f1f5f9'}; color: {msg.user === currentUser.name ? 'white' : 'var(--primary)'}; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; flex-shrink: 0; border: 1px solid var(--border); box-shadow: var(--shadow-sm);">
            {msg.avatar}
          </div>
          <div style="max-width: 75%;">
            <div style="display: flex; gap: 0.5rem; align-items: baseline; margin-bottom: 0.25rem; {msg.user === currentUser.name ? 'justify-content: flex-end' : ''}">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-main);">{msg.user}</span>
              <span style="font-size: 0.65rem; color: var(--text-muted);">{msg.time}</span>
            </div>
            <div style="padding: 0.85rem 1.1rem; background: {msg.user === currentUser.name ? '#f8fafc' : '#ffffff'}; border: 1px solid var(--border); border-radius: {msg.user === currentUser.name ? '16px 4px 16px 16px' : '4px 16px 16px 16px'}; font-size: 0.95rem; line-height: 1.6; color: var(--text-main); box-shadow: var(--shadow-sm);">
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
          style="flex: 1; padding: 0.85rem 1.25rem; border: 1px solid var(--border); border-radius: var(--radius); outline: none; background: white; font-size: 0.95rem; color: var(--text-main);"
        />
        <button type="submit" style="background: var(--primary-gradient); color: white; border: none; padding: 0 1.75rem; border-radius: var(--radius); font-weight: 700; cursor: pointer; transition: transform 0.2s; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);" on:mouseover={(e) => e.target.style.transform = 'scale(1.02)'} on:mouseout={(e) => e.target.style.transform = 'scale(1)'}>
          Send
        </button>
      </form>
    </div>
  </div>
</div>

<style>
  @media (max-width: 768px) {
    header {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 1rem;
    }
    header h2 { font-size: 1.75rem !important; }
    header p { font-size: 0.95rem !important; }
    header div:last-child { display: none; }
    .module-card { height: 500px !important; }
    .module-card > div:first-child { padding: 1rem !important; }
  }
</style>

