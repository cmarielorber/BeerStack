// $(document).ready(function () {
//     const age = {};

//     function getCookie(cname) {
//       let name = cname + "=";
//       let ca = document.cookie.split(';');
//       for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//           c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//           return c.substring(name.length, c.length);
//         }
//       }
//       return "";
//     }

 

//     if (getCookie('popupCookie') != 'submited') {

//       $('#ageModal').modal('show');
//       initAge();
//     }

//     // starts the age verification process
//     function initAge() {
//       let month = 0;
//       let day = 0;
//       let year = 0;

//       $("#age-submit").on("click", function () {
//         age['month'] = $("#verify-month").val();
//         age['day'] = $("#verify-day").val();
//         age['year'] = $("#verify-year").val();
//         checkDate();
//       });
//     }

//     // Check to see if user entered a valid date...
//     function checkDate() {
//       if (age.month == 'none' || age.day == 'none' || age.year == 'none') {
//         // Fade in the error...
//         $('#modal-error').css('visibility', 'visible').hide().fadeIn('slow');

//         // changes the background color of the select if invalid
//         if (age.month == 'none') {
//           $("#verify-month").css('background', 'rgba(223,32,44,0.5)');
//           // Look for change of value and change background color when valid
//           $("#verify-month").on('change', function () {
//             if ($("#verify-month").val() == 'none') {
//               $("#verify-month").css('background', 'rgba(223,32,44,0.5)');
//             } else {
//               $("#verify-month").css('background', 'white');
//             }
//           });
//         }

//         // changes the background color of the select if invalid
//         if (age.day == 'none') {
//           $("#verify-day").css('background', 'rgba(223,32,44,0.5)');
//           // Look for change of value and change background color when valid
//           $("#verify-day").on('change', function () {
//             if ($("#verify-day").val() == 'none') {
//               $("#verify-day").css('background', 'rgba(223,32,44,0.5)');
//             } else {
//               $("#verify-day").css('background', 'white');
//             }
//           });
//         }

//         // changes the background color of the select if invalid
//         if (age.year == 'none') {
//           $("#verify-year").css('background', 'rgba(223,32,44,0.5)');
//           // Look for change of value and change background color when valid
//           $("#verify-year").on('change', function () {
//             if ($("#verify-year").val() == 'none') {
//               $("#verify-year").css('background', 'rgba(223,32,44,0.5)');
//             } else {
//               $("#verify-year").css('background', 'white');
//             }
//           });
//         }
//       } else {
//         oldEnough();
//       }
//     }

//     function setCookie(cname, cvalue, exdays) {
//       let d = new Date();
//       d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//       let expires = "expires=" + d.toUTCString();
//       document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//     }

//     // Compares age entered with todays date 21 years ago...
//     function oldEnough() {
//       let ageLimit = moment().subtract(21, 'years').calendar();
//       let birthDate = age.month + " " + age.day + " " + age.year;
//       let oldEnough = moment(birthDate, "MM DD YYYY").isBefore(ageLimit, 'day');

//       if (oldEnough) {
//         // cookie.set('validAge', 'true');

//         setCookie('popupCookie', 'submited', 1);



//         $('#ageModal').modal('hide');
//       } else {
//         //  cookie.set('validAge', 'false');
//         console.log("it is false");
//       }
//     }
//   });

//   // document
//   //   .querySelector('#signup-form')
//   //   .addEventListener('submit', signupFormHandler);