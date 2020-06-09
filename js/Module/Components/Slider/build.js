define([],()=>({viewModel:function(){this.backHome=(()=>{}),this.myFavorite=(()=>{}),this.myRoom=(()=>{}),this.logout=(()=>{}),this.show=(()=>{blank.show(),this.isShow=!0,$(this).css("margin-left","0px")}),this.hide=(()=>{blank.hide(),this.isShow=!1,$(this).css("margin-left","-100vw")}),this.afterBinding=(()=>{document.addEventListener("swipe",e=>{"left"===e.detail.direction&&this.hide()})}),window.slider=this},template:'\n            <div class="top">\n    <div class="border-avatar">\n        <div class="avatar">DH\n        </div>\n    </div>\n    <div class="information-user">\n        <div class="content">\n            <br>\n            <p style="font-weight: bold;">Hoài Diễn</p>\n            <span>Nơi ở: </span>\n            <span style="color: #F79900;">Hồ Chí Minh</span>\n        </div>\n    </div>\n</div>\n<div class="dash"></div>\n<div class="group">\n    <div class="content-group" data-bind="event:{tap: backHome}">\n        <svg xmlns="http://www.w3.org/2000/svg" width="25.136" height="20" viewBox="0 0 25.136 20">\n            <g id="Group_430" data-name="Group 430" transform="translate(1351.337 -8.897)">\n                <path id="Path_963" data-name="Path 963"\n                    d="M-1255.437,106.935c.47.387.931.765,1.391,1.144q3.7,3.053,7.407,6.1a.443.443,0,0,1,.186.381c-.005,2.41,0,4.821,0,7.231a1.015,1.015,0,0,1-1.071,1.1c-1.923.006-3.846,0-5.769,0-.033,0-.067,0-.126-.009v-5.963h-4.015v5.972h-5.829a1.039,1.039,0,0,1-1.153-1.163q0-3.564,0-7.128a.5.5,0,0,1,.2-.435q4.28-3.518,8.552-7.046C-1255.595,107.061-1255.52,107-1255.437,106.935Z"\n                    transform="translate(-83.332 -93.998)" fill="#8c8c8c" />\n                <path id="Path_964" data-name="Path 964"\n                    d="M-1338.773,11.556l-2.449,2.04-8.2,6.833c-.4.333-.639.308-.972-.095-.249-.3-.5-.6-.753-.9a.533.533,0,0,1,.083-.881q4-3.337,8.009-6.672c.965-.8,1.939-1.6,2.892-2.417a1.967,1.967,0,0,1,1.942-.479,2.177,2.177,0,0,1,.728.407c1.173.962,2.333,1.941,3.5,2.914l.2.169c.006-.113.012-.184.012-.255q0-1.308,0-2.617c0-.5.16-.665.665-.665q1.329,0,2.658,0c.5,0,.663.171.663.673,0,1.985,0,3.97,0,5.955a.458.458,0,0,0,.189.4q1.511,1.244,3.013,2.5c.063.053.129.1.189.16a.492.492,0,0,1,.068.733q-.448.565-.924,1.107c-.24.272-.506.268-.814.012q-1.354-1.126-2.706-2.256l-7.784-6.49C-1338.626,11.672-1338.691,11.622-1338.773,11.556Z"\n                    fill="#8c8c8c" />\n            </g>\n        </svg>\n        <p>Trang chủ</p>\n    </div>\n</div>\n<div class="thin-dash"></div>\n<div class="group">\n\n    <div class="content-group" data-bind="event:{tap : myFavorite}">\n        <svg xmlns="http://www.w3.org/2000/svg" width="17.147" height="20" viewBox="0 0 17.147 20">\n            <g id="Group_1588" data-name="Group 1588" transform="translate(2225.608 -2154.9)">\n                <path id="Path_1744" data-name="Path 1744"\n                    d="M-2221.327,2156.138c.011.213,0,.4.031.586a1.823,1.823,0,0,0,1.756,1.593q2.512.03,5.025,0a1.844,1.844,0,0,0,1.773-1.841c0-.106,0-.211,0-.348.328,0,.632,0,.936,0a15.662,15.662,0,0,1,1.787.039,1.784,1.784,0,0,1,1.553,1.839q.006,7.514,0,15.029a1.815,1.815,0,0,1-1.821,1.86q-6.736.008-13.473,0a1.822,1.822,0,0,1-1.833-1.71,3.069,3.069,0,0,1-.013-.322q0-7.34,0-14.68a1.889,1.889,0,0,1,.848-1.74,1.807,1.807,0,0,1,.831-.295C-2223.072,2156.114-2222.213,2156.138-2221.327,2156.138Zm4.31,13.757c1.412,0,2.823,0,4.235,0a.606.606,0,0,0,.646-.623.6.6,0,0,0-.622-.62q-4.275,0-8.549,0a.581.581,0,0,0-.541.318.618.618,0,0,0,.57.927C-2219.857,2169.9-2218.437,2169.9-2217.017,2169.9Zm-.013-7.505h4.076a2.041,2.041,0,0,0,.315-.016.6.6,0,0,0,.5-.6.626.626,0,0,0-.712-.642h-8.364c-.044,0-.087,0-.131,0a.636.636,0,0,0-.587.641.62.62,0,0,0,.588.607c.087.008.176,0,.263,0Zm-.012,3.749h2.656c.543,0,1.087.006,1.631,0a.6.6,0,0,0,.616-.674.62.62,0,0,0-.7-.571q-3.6,0-7.207,0h-1.236a.6.6,0,0,0-.6.393.613.613,0,0,0,.6.853C-2219.865,2166.142-2218.454,2166.139-2217.042,2166.139Z"\n                    fill="#8c8c8c" />\n                <path id="Path_1745" data-name="Path 1745"\n                    d="M-2217.145,2157.36c-.674,0-1.347,0-2.021,0a.924.924,0,0,1-1.007-1.036c0-.167,0-.335,0-.5a.9.9,0,0,1,.913-.916q2.112-.009,4.224,0a.88.88,0,0,1,.892.848,5.488,5.488,0,0,1,0,.714.884.884,0,0,1-.907.89C-2215.745,2157.367-2216.445,2157.36-2217.145,2157.36Z"\n                    transform="translate(0.122)" fill="#8c8c8c" />\n            </g>\n        </svg>\n        <p>Quan tâm của tôi</p>\n    </div>\n</div>\n<div class="thin-dash"></div>\n<div class="group">\n    <div class="content-group" data-bind="event:{tap : myRoom}">\n        <svg xmlns="http://www.w3.org/2000/svg" width="18.399" height="20.694" viewBox="0 0 18.399 20.694">\n            <g id="Group_1408" data-name="Group 1408" transform="translate(2166.653 -2109.561)">\n                <path id="Path_1691" data-name="Path 1691"\n                    d="M-2157.758,2119.367l-8.132-4.544a.405.405,0,0,1,0-.708l8.1-4.476a.631.631,0,0,1,.609,0l8.1,4.511a.405.405,0,0,1,0,.708l-8.073,4.508A.626.626,0,0,1-2157.758,2119.367Z"\n                    fill="#8c8c8c" />\n                <path id="Path_1692" data-name="Path 1692"\n                    d="M-2148.933,2116.108l-7.79,4.172a.461.461,0,0,0-.244.407v9.106a.462.462,0,0,0,.68.407l7.79-4.172a.461.461,0,0,0,.243-.407v-9.107A.461.461,0,0,0-2148.933,2116.108Z"\n                    fill="#8c8c8c" />\n                <path id="Path_1693" data-name="Path 1693"\n                    d="M-2165.973,2116.108l7.789,4.172a.461.461,0,0,1,.244.407v9.106a.461.461,0,0,1-.679.407l-7.79-4.172a.462.462,0,0,1-.244-.407v-9.107A.462.462,0,0,1-2165.973,2116.108Z"\n                    fill="#8c8c8c" />\n            </g>\n        </svg>\n        <p>Phòng trọ của tôi</p>\n    </div>\n</div>\n<div class="thin-dash"></div>\n<div class="group">\n    <div class="content-group" data-bind="event:{tap : logout}">\n        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 15.72 15.713">\n            <g id="Group_687" data-name="Group 687" transform="translate(0 80)">\n                <path id="Path_1164" data-name="Path 1164"\n                    d="M283.545,682.146c0,.186,0,.356,0,.526a.708.708,0,0,1-.907.746l-5.63-1.126c-.271-.054-.542-.107-.813-.164a.705.705,0,0,1-.566-.675c0-.065,0-.13,0-.2q0-6.352,0-12.7a1.025,1.025,0,0,1,.036-.312.7.7,0,0,1,.706-.513c.118,0,.236,0,.354,0h9.959a.709.709,0,0,1,.743.557.841.841,0,0,1,.016.182q0,1.916,0,3.832a.709.709,0,1,1-1.416,0q0-1.5,0-2.99v-.153h-4.8c.051.02.077.033.105.041l1.634.491a.718.718,0,0,1,.581.777v10.258h2.483v-.146c0-1,0-2.01,0-3.015a.706.706,0,0,1,1.024-.655.66.66,0,0,1,.389.616q.005,1.965,0,3.93a.7.7,0,0,1-.741.7c-.887,0-1.774,0-2.66,0Z"\n                    transform="translate(-275.628 -747.726)" fill="#8c8c8c" />\n                <path id="Path_1165" data-name="Path 1165"\n                    d="M306.11,682.811c-.228-.226-.456-.452-.683-.679a.71.71,0,1,1,1.008-1L308.3,683a.717.717,0,0,1,0,1.1q-.935.937-1.872,1.872a.71.71,0,1,1-1-1c.23-.23.46-.458.718-.715h-3.467a.683.683,0,0,1-.656-.385.673.673,0,0,1,.057-.738.724.724,0,0,1,.636-.295q1.635,0,3.27,0h.118Z"\n                    transform="translate(-292.839 -756.341)" fill="#8c8c8c" />\n            </g>\n        </svg>\n        <p>Đăng xuất</p>\n    </div>\n</div>\n        '}));