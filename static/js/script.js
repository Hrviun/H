// 团队成员数据
const teamMembers = [{
        id: 1,
        name: "水七木",
        position: "管理",
        image: "https://q2.qlogo.cn/headimg_dl?dst_uin=2035135646&spec=100",
        bio: "无",
        skills: ["web","Python","等"],
        achievements: [
            "无"
        ]
    },

    /*{
        id: 2,
        name: "名字",
        position: "职位",
        image: "img/1000001557.jpg",
        bio: "个人简介",
        skills: ["技能"],
        achievements: [
            "成就"
        ]
    },
    */

    /*
    {
        id: 3,
        name: "名字",
        position: "职位",
        image: "头像",
        bio: "个人简介",
        skills: ["技能"],
        achievements: [
            "成就"
        ]
        
    },
    */
];

// DOM元素选择
const teamContainer = document.getElementById('teamContainer');
const memberPopup = document.getElementById('memberPopup');
const popupClose = document.getElementById('popupClose');
const popupName = document.getElementById('popupName');
const popupPosition = document.getElementById('popupPosition');
const popupImage = document.getElementById('popupImage');
const popupBio = document.getElementById('popupBio');
const popupSkills = document.getElementById('popupSkills');
const popupAchievements = document.getElementById('popupAchievements');
const loader = document.getElementById('loader');

// 渲染团队成员卡片
function renderTeamCards() {
    teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <div class="card-content">
                <div class="card-avatar">
                    <img src="${member.image}" alt="${member.name}">
                </div>
                <div class="card-info">
                    <h3>${member.name}</h3>
                    <div class="position">${member.position}</div>
                </div>
                <button class="view-more" data-id="${member.id}">查看详情</button>
                <div class="social-icons">
                    <a href="#"><i>••</i></a>
                    <a href="#"><i>••</i></a>
                    <a href="#"><i>••</i></a>
                </div>
            </div>
        `;
        teamContainer.appendChild(card);
    });

    // 为"查看详情"按钮添加点击事件
    document.querySelectorAll('.view-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            openMemberPopup(parseInt(this.getAttribute('data-id')));
        });
    });

    // 为卡片添加点击事件
    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('click', function() {
            openMemberPopup(parseInt(this.querySelector('.view-more').getAttribute('data-id')));
        });
    });
}

// 打开成员详情弹窗
function openMemberPopup(memberId) {
    showLoader();

    setTimeout(() => {
        const member = teamMembers.find(m => m.id === memberId);
        if (!member) {
            hideLoader();
            return;
        }

        popupName.textContent = member.name;
        popupPosition.textContent = member.position;
        popupImage.src = member.image;
        popupImage.alt = member.name;
        popupBio.textContent = member.bio;

        // 清空并填充技能标签
        popupSkills.innerHTML = '';
        member.skills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            popupSkills.appendChild(skillTag);
        });

        // 清空并填充成就列表
        popupAchievements.innerHTML = '';
        member.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            popupAchievements.appendChild(li);
        });

        memberPopup.classList.add('open');
        hideLoader();
    }, 500);
}

// 关闭成员详情弹窗
function closeMemberPopup() {
    memberPopup.classList.remove('open');
}

// 显示加载动画
function showLoader() {
    loader.style.display = 'flex';
}

// 隐藏加载动画
function hideLoader() {
    loader.style.display = 'none';
}

// 为关闭按钮添加点击事件
popupClose.addEventListener('click', closeMemberPopup);

// 点击弹窗外部区域关闭弹窗
memberPopup.addEventListener('click', function(event) {
    if (event.target === memberPopup) {
        closeMemberPopup();
    }
});

// 按下ESC键关闭弹窗
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && memberPopup.classList.contains('open')) {
        closeMemberPopup();
    }
});

// 为触摸设备添加滑动关闭弹窗的功能
if ('ontouchstart' in window) {
    let startY = 0;
    let moveY = 0;
    let isMoving = false;

    memberPopup.addEventListener('touchstart', function(e) {
        if (e.target === memberPopup) {
            startY = e.touches[0].clientY;
            isMoving = true;
        }
    });

    memberPopup.addEventListener('touchmove', function(e) {
        if (isMoving) {
            moveY = e.touches[0].clientY;
            if (startY - moveY > 50) { // 向下拖动超过50px
                closeMemberPopup();
            }
        }
    });

    memberPopup.addEventListener('touchend', function() {
        isMoving = false;
    });
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    showLoader();
    setTimeout(() => {
        renderTeamCards();
        hideLoader();
    }, 777);
});