<script lang="ts">
  interface Message {
    id: number;
    user: string;
    text: string;
    time: string;
    avatar: string;
  }

  let messages: Message[] = [
    { id: 1, user: 'Sarah', text: 'Hey, have you reviewed the new media assets?', time: '10:42 AM', avatar: 'S' },
    { id: 2, user: 'Mike', text: 'Just finishing up the editorial piece. Will check in 5.', time: '10:45 AM', avatar: 'M' },
    { id: 3, user: 'You', text: 'I updated the auth roles for the new team members.', time: '10:48 AM', avatar: 'A' },
  ];
  let newMessage: string = "";

  function sendMessage(): void {
    if (newMessage.trim()) {
      messages = [...messages, {
        id: Date.now(),
        user: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: 'A'
      }];
      newMessage = "";
    }
  }
</script>

<div class="animate-in">
  <header style="margin-bottom: 2rem;">
    <h2 class="vibrant-text" style="font-size: 2rem;">Collaboration Hub</h2>
    <p style="color: var(--text-muted);">Real-time team communication (Svelte + TS)</p>
  </header>

  <div class="card" style="display: flex; flex-direction: column; height: 500px; padding: 0;">
    <div style="padding: 1rem 1.5rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
      <h3 style="font-size: 1.1rem;">Team Chat</h3>
      <div style="display: flex; -webkit-mask-image: linear-gradient(to right, transparent, black 20%);">
        {#each ['S', 'M', 'J', 'R'] as user}
          <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--secondary); border: 2px solid var(--bg-dark); margin-left: -8px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold;">{user}</div>
        {/each}
      </div>
    </div>

    <div style="flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
      {#each messages as msg}
        <div style="display: flex; gap: 1rem; align-items: flex-start; {msg.user === 'You' ? 'flex-direction: row-reverse' : ''}">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: {msg.user === 'You' ? 'var(--primary)' : 'var(--glass)'}; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">
            {msg.avatar}
          </div>
          <div style="max-width: 70%;">
            <div style="display: flex; gap: 0.5rem; align-items: baseline; margin-bottom: 0.25rem; {msg.user === 'You' ? 'justify-content: flex-end' : ''}">
              <span style="font-size: 0.85rem; font-weight: 600;">{msg.user}</span>
              <span style="font-size: 0.7rem; color: var(--text-muted);">{msg.time}</span>
            </div>
            <div style="background: {msg.user === 'You' ? 'var(--primary)' : 'var(--glass)'}; padding: 0.75rem 1rem; border-radius: {msg.user === 'You' ? '1rem 0 1rem 1rem' : '0 1rem 1rem 1rem'}; border: 1px solid var(--border);">
              {msg.text}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div style="padding: 1.5rem; border-top: 1px solid var(--border);">
      <form on:submit|preventDefault={sendMessage} style="display: flex; gap: 1rem;">
        <input 
          bind:value={newMessage}
          type="text" 
          placeholder="Type your message..."
          style="flex: 1; padding: 0.75rem 1rem; background: var(--bg-darker); border: 1px solid var(--border); border-radius: 0.5rem; color: var(--text-main);"
        >
        <button type="submit" class="glass-btn active">Send</button>
      </form>
    </div>
  </div>
</div>

<style>
  ::-webkit-scrollbar {
    width: 6px;
  }
</style>
