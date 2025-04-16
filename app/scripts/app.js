'use strict';

window.addEventListener('load', function() {
  init();
});

async function init() {
  try {
    // Initialize the app
    window.client = await app.initialized();
    console.log('App initialized');
    
    // 현재 위치(context)를 확인 - 수정된 부분
    const context = await client.instance.context();
    console.log('App context:', context);
    
    // 위치에 맞게 UI 설정
    setupUI(context.location);
    
    // 이벤트 리스너 설정
    setupEventListeners(context.location);
  } catch (error) {
    console.error('Failed to initialize app:', error);
    notifyError('앱을 초기화하는 중 오류가 발생했습니다.');
  }
}

// 위치에 따라 UI 컴포넌트 표시/숨김 처리
function setupUI(location) {
  try {
    const topNavContainer = document.getElementById('topNavContainer');
    const sidebarContainer = document.getElementById('sidebarContainer');
    
    if (location === 'ticket_top_navigation') {
      console.log('Setting up UI for top navigation');
      if (topNavContainer) topNavContainer.style.display = 'block';
      if (sidebarContainer) sidebarContainer.style.display = 'none';
    } else if (location === 'ticket_sidebar') {
      console.log('Setting up UI for sidebar');
      if (topNavContainer) topNavContainer.style.display = 'none';
      if (sidebarContainer) sidebarContainer.style.display = 'block';
    }
  } catch (error) {
    console.error('Error setting up UI:', error);
  }
}

function setupEventListeners(location) {
  try {
    // 위치에 따라 적절한 버튼 ID 선택
    const buttonId = location === 'ticket_top_navigation' ? 'topNavModalBtn' : 'openModalBtn';
    console.log(`Setting up event listener for button: ${buttonId}`);
    
    const button = document.getElementById(buttonId);
    if (button) {
      // fwClick 이벤트 리스너 설정
      button.addEventListener('fwClick', async () => {
        await showTicketDetails();
      });
      
      // 모바일 및 호환성 문제를 위한 일반 클릭 이벤트도 추가
      button.addEventListener('click', async () => {
        await showTicketDetails();
      });
      
      console.log(`Event listeners set for ${buttonId}`);
    } else {
      console.error(`Button not found: ${buttonId}`);
    }
  } catch (error) {
    console.error('Error in setupEventListeners:', error);
    notifyError('이벤트 설정 중 오류가 발생했습니다.');
  }
}

// 티켓 상세 정보 표시 함수 (공통 로직)
async function showTicketDetails() {
  try {
    console.log('Attempting to show ticket details');
    const { ticket } = await client.data.get('ticket');
    console.log('Opening modal with ticket:', ticket);

    await client.interface.trigger('showModal', {
      title: '티켓 상세정보',
      template: 'views/modal.html'
    });
  } catch (error) {
    console.error('Error showing ticket details:', error);
    notifyError('티켓 정보를 불러올 수 없습니다.');
  }
}

async function notifyError(message) {
  try {
    await client.interface.trigger('showNotify', {
      type: 'danger',
      message: message
    });
  } catch (error) {
    console.error('Error showing notification:', error);
  }
}
