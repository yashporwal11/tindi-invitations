var fp = _.noConflict();

let functions = [
  {
    id: "mandap_vidhi",
    name: "Mandap Vidhi"
  },
  {
    id: "mahendi_function",
    name: "Mahendi Function"
  },
  {
    id: "xyz_function",
    name: "XYZ Function"
  },
  {
    id: "garba_night",
    name: "Garba Night"
  },
]

let functions_div = document.querySelector('.functions');
functions.forEach((data) => {
  functions_div.innerHTML += `<label class="container" for=${data.id}
  >${data.name}
  <input type="checkbox" id=${data.id} name=${data.id} />
  <span class="fun_checkmark"></span>
</label>`
})

let persons = [
  {
    name: "Azmol",
    invites: "one",
    side: "groom"
  },
  {
    name: "Anmola",
    invites: "family",
    side: "bride"
  },
  {
    name: "shivam",
    invites: "one",
    side: "groom"
  },
  {
    name: "bunty",
    invites: "two",
    side: "bride"
  },
  {
    name: "tony",
    invites: "two",
    side: "groom"
  },
  {
    name: "mol",
    invites: "family",
    side: "groom"
  },
  {
    name: "Ani",
    invites: "family",
    side: "bride"
  },
  {
    name: "vamu",
    invites: "one",
    side: "groom"
  },
  {
    name: "chintu",
    invites: "two",
    side: "bride"
  },
  {
    name: "chhotu",
    invites: "two",
    side: "groom"
  },
  {
    name: "neha",
    invites: "one",
    side: "groom"
  },
  {
    name: "nehal",
    invites: "one",
    side: "bride"
  },
]

let filtered_persons_by_search_input = persons;
let filtered_persons_by_filter_tag = [];
let filtered_persons_by_filter_tag_and_search_input = persons;

let name_input = document.getElementById("name");
name_input.oninput = function (e) {
  if (e.target.value != "") {
    name_input.classList.add('active');
  }
  else {
    name_input.classList.remove('active');
  }
};

var radio_label = document.querySelectorAll('label.radio_label');
radio_label.forEach(ele => {
  ele.addEventListener('click', () => {
    radio_label.forEach(data => {
      if (data.control.checked) {
        data.classList.add('active');
      }
      else {
        data.classList.remove('active');
      }
    })
  })
})

let list_of_people = document.querySelector('.list_of_people')
let search_input = document.querySelector('.search_input');
search_input.addEventListener('input', e => {
  filtered_persons_by_search_input = persons.filter(ele => {
    return ele.name.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())
  })
  if (filtered_persons_by_filter_tag.length !== 0) {
    filtered_persons_by_filter_tag_and_search_input = filtered_persons_by_search_input.filter(ele => filtered_persons_by_filter_tag.includes(ele));
    show_persons(filtered_persons_by_filter_tag_and_search_input);
    return;
  }
  show_persons(filtered_persons_by_search_input);
})

let active_filters = [];
let filter_arr = document.querySelectorAll('.filter');
filter_arr.forEach(filter_tag => {
  filter_tag.onclick = () => {
    filter_tag.classList.toggle('active');
    if (filter_tag.classList.value.includes('active')) {
      active_filters.push(filter_tag.innerText.trim().split(" ")[0].toLowerCase())
    }
    else {
      let index = active_filters.indexOf(filter_tag.innerText.trim().split(" ")[0].toLowerCase());
      if (index !== -1) {
        active_filters.splice(index, 1);
      }
    }
    console.log(active_filters);
    filtered_persons_by_filter_tag = [];
    if (active_filters.length === 0) {
      show_persons(filtered_persons_by_search_input);
    }
    else if (active_filters.length === 1) {
      if (active_filters[0] === "bride" || active_filters[0] === "groom") {
        filtered_persons_by_filter_tag = _.filter(persons, { side: active_filters[0] });
      }
      else {
        filtered_persons_by_filter_tag = _.filter(persons, { invites: active_filters[0] });
      }

      if (filtered_persons_by_search_input.length !== 0) {
        filtered_persons_by_filter_tag_and_search_input = filtered_persons_by_filter_tag.filter(ele => filtered_persons_by_search_input.includes(ele));
        show_persons(filtered_persons_by_filter_tag_and_search_input);
        return;
      }

      show_persons(filtered_persons_by_filter_tag);
    }
    else if (active_filters.length === 2) {

      if (active_filters[0] === "bride" || active_filters[0] === "groom") {
        filtered_persons_by_filter_tag = _.filter(persons, { side: active_filters[0], invites: active_filters[1] })
      }
      else {
        filtered_persons_by_filter_tag = _.filter(persons, { invites: active_filters[0], side: active_filters[1] })
      }

      if (filtered_persons_by_search_input.length !== 0) {
        filtered_persons_by_filter_tag_and_search_input = filtered_persons_by_filter_tag.filter(ele => filtered_persons_by_search_input.includes(ele))
        show_persons(filtered_persons_by_filter_tag_and_search_input);
        return;
      }
      show_persons(filtered_persons_by_filter_tag);
    }
    else {
      show_persons([])
    }
  }
})

show_persons(persons)

function show_persons(arr) {
  console.log(arr);
  list_of_people.innerHTML = "";
  if (arr.length === 0) {
    list_of_people.innerHTML = `<div class="person">
    <div class="name">No result found</div>
  </div>
  <hr />`;
  }
  else {
    arr.sort(function (a, b) {
      var nameA = a.name.trim().toLowerCase(), nameB = b.name.trim().toLowerCase()
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0;
    });
    arr.forEach(ele => {
      let x = document.getElementById(ele.name.trim()[0].toLowerCase());
      if (x === null) {
        list_of_people.innerHTML += `<div class="alphabet" id="${ele.name.trim()[0].toLowerCase()}">${ele.name.trim()[0].toUpperCase()}</div>`
      }

      let src_side, alt_side, alt_invites, src_invites;

      if (ele.invites === "one") {
        src_invites = './images/one_member.svg';
        alt_invites = "one";
      }
      else if (ele.invites === "two") {
        src_invites = './images/two_members.svg';
        alt_invites = "two";
      }
      else {
        src_invites = './images/family.svg';
        alt_invites = "family";
      }

      if (ele.side === "groom") {
        src_side = './images/groom.svg';
        alt_side = "groom";
      }
      else if (ele.side === "bride") {
        src_side = './images/bride.svg';
        alt_side = "bride;";
      }

      list_of_people.innerHTML += `<div class="person">
            <div class="numbers">
              <img src=${src_invites} alt=${alt_invites} />
            </div>
            <div class="name">${ele.name}</div>
            <div class="family_side">
              <img src=${src_side} alt=${alt_side} />
            </div>
          </div>
          <hr />`
    })
  }
}

let add_invitation_btn = document.querySelector('.add_invitations');

add_invitation_btn.addEventListener('click', () => {
  document.querySelector('.create_invite').style.display = 'block';
  document.querySelector('.invitations').style.display = 'none';
  add_invitation_btn.style.display = 'none';
})

let back_btn = document.querySelector('.back_btn');

back_btn.addEventListener('click', () => {
  document.querySelector('.create_invite').style.display = 'none';
  document.querySelector('.invite_details').style.display = 'none';
  document.querySelector('.invitations').style.display = 'block';
  add_invitation_btn.style.display = 'block';
})

let desktop_backBtn = document.querySelector('.desktop_backBtn');

desktop_backBtn.addEventListener('click', () => {
  document.querySelector('.create_invite').style.display = 'block';
  document.querySelector('.invite_details').style.display = 'none';
})

let person = document.querySelector('.person');

person.addEventListener('click', () => {
  document.querySelector('.create_invite').style.display = 'none';
  document.querySelector('.invite_details').style.display = 'block';
  if (screen.width <= 576) {
    document.querySelector('.invitations').style.display = 'none';
  }
})
