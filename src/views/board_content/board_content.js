const board_title = document.querySelector('#board_title');

// 게시판으로 다시 이동.
board_title.addEventListener('click', () => {
  location.href = "http://localhost:3000/static/board/board.html";
})

// 문의 게시판에서 글을 선택하면 form으로 게시글에 대한 get 요청
// 이후 받아온 정보를 기반으로 출력.
// 현재 이 파일에 임시로 받아온 데이터(data)가 있다고 가정.
const data = {
  id: 2,
  title: '두 번째 문의글입니다.',
  createdAt: '2021-07-16',
  description: '질문내용.... Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  
  // 추가로 게시글에 관련 댓글 데이터 관계형 db로 구현해야 할 듯.
  // 생성 날짜 순으로 정렬
  comments: [
    {
      id: 1,
      user_id: 'user1',
      comment_description: 'user1 답변내용...',
      comment_createdAt: '2021-07-17',
    },
    {
      id: 2,
      user_id: 'user4',
      comment_description: 'user4 답변내용...',
      comment_createdAt: '2021-07-18',
    },
    {
      id: 3,
      user_id: 'user2',
      comment_description: 'user2 답변내용...',
      comment_createdAt: '2021-07-18',
    }
  ]
}

const content_title = document.querySelector('.content_title');
const content_date = document.querySelector('.content_date');
const content_description = document.querySelector('.content_description');
const comment_ul = document.querySelector('.comment_ul');

content_title.innerText = data.title;
content_date.innerText = data.createdAt;
content_description.innerText = data.description;

data.comments.forEach(comment => {
  let comment_list = document.createElement('template');
  comment_list.innerHTML = `
    <li class="comment">
      <div class="info">
        <div class="writer">${comment.user_id}</div>
        <div class="write_content">${comment.comment_description}</div>
        <div class="write_date">${comment.comment_createdAt}</div>
      </div>
      <i class="fas fa-trash-alt"></i>
    </li>
    `
  comment_ul.append(comment_list.content);
})


// form으로 댓글 등록
const add_form = document.querySelector('.comment_add_form');
const form_comment = document.querySelector('.comment_content');
const form_submit_btn = document.querySelector('.submit_btn');

const add_form_data = new FormData(add_form); // 문제시, 인자 add_from 제거


// 댓글 추가.
form_submit_btn.addEventListener('click', (event) =>{
  // 댓글 내용 formData에 추가.
  add_form_data.append('comment', form_comment.value);

  // 확인용 코드
  for (var key of add_form_data.keys()) {
    console.log(key);
  }
  for (var value of add_form_data.values()) {
    console.log(value);
  }
  event.preventDefault();

  // 이후 fetch로 서버에 접근하여 db에 댓글 추가 후,
  // 다시 이 게시글의 댓글 내용을 받아와서 화면 업데이트.
  // AJAX 써야할 듯.
  // fetch('서버주소', {
  //   method: 'POST',
  //   body: 'form 내용',
  // })
  // form이 다 해주나?
})


// 댓글 삭제
const delete_btn = document.querySelectorAll('.fa-trash-alt');

delete_btn && delete_btn.forEach(btn => {
  btn.addEventListener('click', (event) => {
    console.log(event.currentTarget);
    // 서버에 fetch로 delete 요청 보내야 함.
    // fetch('서버주소', {
    //   method="DELETE",
    // })


    event.preventDefault();
  })
})