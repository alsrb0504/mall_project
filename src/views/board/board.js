const btns = document.querySelectorAll('.btns');
const slider = document.querySelector('.slider');

let cur_position = 0;

function selectButton (index) {
  btns.forEach((btn) => {
    if(btns[index] === btn) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  })
}

function handleSlider (slider_position) {
  let position;
  if(slider_position != null){
    position = slider_position;
  } else {
    switch (cur_position){
      case 0: position = '-33.3%'; break;
      case 100: position = '-66.6%'; break;
      case 200: position = '0'; break;
    }
  }

  switch(position) {
    case '0':
      selectButton(0);
      cur_position = 0;
      break;
    case '-33.3%':
      selectButton(1);
      cur_position = 100;
      break;
    case '-66.6%':
      selectButton(2);
      cur_position = 200;
      break;
    default:
      console.error(`invalide postion value: ${position}`)
  }
  slider.style.transform = `translate(${position})`;
}

// setInterval(handleSlider, 3000);

btns[0].addEventListener("click", () => handleSlider('0'));
btns[1].addEventListener("click",  () => handleSlider('-33.3%'));
btns[2].addEventListener("click", () => handleSlider('-66.6%'));



// 게시판
// 게시글 아이템
const board_notice = {
  id: 0,
  title: '공지사항',
  createdAt: '2021-07-13',
  description: '이것은 공지사항입니다....',
}

const board_texts = [
  {
    id: 1,
    user_id: 'user1',
    title: '첫 번째 문의글',
    createdAt: '2021-07-14',
    description: '첫 번째 문의글입니다..',
  },
  {
    id: 2,
    user_id: 'user2',
    title: '두 번째 문의글입니다.',
    createdAt: '2021-07-15',
    description: '두 번째 문의글입니다..',
  },
  {
    id: 3,
    user_id: 'user3',
    title: '3번째 문의글입니다.',
    createdAt: '2021-07-15',
    description: '세 번째..',
  },
  {
    id: 4,
    user_id: 'user4',
    title: '4번째 문의글',
    createdAt: '2021-07-16',
    description: '44444..',
  },
  {
    id: 5,
    user_id: 'user5',
    title: '5번째 마지막 문의글',
    createdAt: '2021-07-17',
    description: '55555...',
  }
]

const list = document.querySelector('.board_list');

function board_render() {
  // 공지글 서버에 저장?
  const notice_element = document.createElement('template');
  notice_element.innerHTML = `
    <li class="list_item">
      <a class="list_item_title list_item_notice" href="../board_content/board_content.html">${board_notice.title}</a>
      <span class="list_itme_date">${board_notice.createdAt}</span>
    </li>
  `;
  list.append(notice_element.content);
  
  
  // 나중에는 서버에서 온 데이터를 인자로 받아서 사용.
  // 게시글 출력
  board_texts.forEach(text => {
    const template = document.createElement('template');
    template.innerHTML = `
      <li class="list_item">
        <a class="list_item_title" href="#">${text.title}</a>
        <span class="list_itme_date">${text.createdAt}</span>
      </li>
    `;
    list.appendChild(template.content);
  })

}

// 게시글 출력
board_render();

const write_board = document.querySelector('#write_board');
const board = document.querySelector('#board');

const write_Btn = document.querySelector('#write_btn'); 
const cancel_Btn = document.querySelector('#cancel_btn');

const search_Btn = document.querySelector('#search_btn');
const submit_Btn = document.querySelector('#submit_btn');

write_Btn.addEventListener('click', () => {
  board.classList.add('invisible');
  write_board.classList.remove('invisible');
})

cancel_Btn.addEventListener('click', () => {
  board.classList.remove('invisible');
  write_board.classList.add('invisible');
})

search_Btn.addEventListener('click', (event) => {
  const search_title = document.querySelector('#search_title');

  const formData = new FormData();
  formData.append('title', search_title.value);
  // // 보안 정책으로 formData 내부의 내용을 보기 위해 사용.
  for (var key of formData.keys()) {
    console.log(key);
  }
  for (var value of formData.values()) {
    console.log(value);
  }
  event.preventDefault();
})

submit_Btn.addEventListener('click', (event) => {
  const title = document.querySelector('#write_title');
  const content = document.querySelector('#write_content');

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('content', content.value);

  // 보안 정책으로 formData 내부의 내용을 보기 위해 사용.
  for (var key of formData.keys()) {
    console.log(key);
  }
  for (var value of formData.values()) {
    console.log(value);
  }
  event.preventDefault();
})