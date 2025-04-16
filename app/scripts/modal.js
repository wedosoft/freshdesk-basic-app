document.addEventListener('DOMContentLoaded', async function() {
  try {
    const client = await app.initialized();
    const context = await client.instance.context();
    
    const ticket = context.data;
    
    document.getElementById('ticketSubject').textContent = ticket.subject || '제목 없음';
    document.getElementById('ticketDescription').textContent = ticket.description || '설명 없음';
    
    if (ticket.conversations && ticket.conversations.length > 0) {
      const replies = ticket.conversations
        .filter(conv => conv.incoming)
        .map(conv => `<div class="reply">${conv.body_text || '내용 없음'}</div>`)
        .join('');
      document.getElementById('ticketReplies').innerHTML = replies;
    } else {
      document.getElementById('ticketReplies').textContent = '답변이 없습니다.';
    }
  } catch (error) {
    console.error('Error in modal:', error);
  }
});

function updateModalContent(ticket) {
  const subjectEl = document.getElementById('modalTicketSubject');
  const descriptionEl = document.getElementById('modalTicketDescription');
  const repliesEl = document.getElementById('modalTicketReplies');

  if (subjectEl) {
    subjectEl.textContent = ticket.subject || '제목 없음';
  }
  
  if (descriptionEl) {
    descriptionEl.textContent = ticket.description || '설명 없음';
  }
  
  if (repliesEl && ticket.conversations) {
    const replies = ticket.conversations
      .filter(conv => conv.incoming)
      .map(conv => `<div class="reply">${escapeHtml(conv.body_text || '내용 없음')}</div>`)
      .join('');
    repliesEl.innerHTML = replies || '<div class="no-replies">답변이 없습니다.</div>';
  }
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
} 