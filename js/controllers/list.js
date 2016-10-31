(function(){
  angular.module("turtleFacts")
  .controller("listCtrl", ListController);

  // html 내에 ng-controller가 "listCtrl"로 지정되어 있는 태그 내에서,
  // listCtrl as list로 사용하려면 $scope 객체를 사용하지않고,
  // this를 사용한다.
  // function ListController($scope){
  //   $scope.dummyData = "hello world";
  // }

  //ListController와 공유데이터가 포함된 factories폴더 내의 quizMetrics.js, dataservice.js 연결
  ListController.$inject = ['quizMetrics', 'DataService'];

  //factory폴더의 quizMetrics를 인자로 전달
  function ListController(quizMetrics, DataService) {
    //html내의 ng-controller="listCtrl as list"에서 this는 객체이며,
    //키워드 list와 바인딩 // console.log(this); // console.dir(this);
    var vm = this;

    // vm.dummyData = "hello Younghun"; //Testing

    // 인자로 넘겨받은 quizMetrics 객체를 listController가 참조할 수 있도록 설정
    vm.quizMetrics = quizMetrics;
    // 인자로 넘겨받은 DataService 객체를 listController가 참조할 수 있도록 설정
    // Turtle data 를 끌어온다.
    vm.data = DataService.turtlesData;
    // turtlesData 참조
    // vm.data = turtlesData; // 필요없음 dataService 파일 이용
    // 활성화 된 거북이에 대한 객체 선언
    vm.activeTurtle = {};
    // html상의 turtle을 받아오는 index에 따라 선택된 거북이를 변경하는 함수를 참조
    vm.changeActiveTurtle = changeActiveTurtle;
    // 검색 칸에 입력한 값을 데이터와 바인딩하기 위한 변수 선언
    // vm.search = "testing"; 하면 input 칸에 testing 반영
    vm.search = "";
    // start Quiz 버튼을 누를 경우 특정 area를 숨김, 기본값 false; 숨기지 않은 경우; 숨기고자 하는 태그 속성에 ng-hide 추가
    // vm.quizActive = false; //factory의 quizMetrics와 연결하였기 때문에 listCtrl의 quizActive 변수는 필요 없게된다.
    vm.activateQuiz = activateQuiz;

    // index에 따라 선택된 거북이 변경
    function changeActiveTurtle(currentTurtle) {
      vm.activeTurtle = currentTurtle;
    }
    // 거북이 설명 부분과 quiz 부분 보임, 숨김 함수
    function activateQuiz() {
      // vm.quizMetrics.quizActive = true;
      quizMetrics.changeState("quiz", true);
    }
  }

  // 여기에 데이터들이 있는경우 controller가 data를 받아오는 것까지 신경써야 하므로 Dataservice라는 파일로 data만 관장하는 파일을 만들어준다.
  /*
  var turtlesData = [
      {
          type: "Green Turtle",
          image_url: "http://www.toonts.com/wp-content/uploads/2016/04/green-sea-turtle11.jpg",
          locations: "Tropical and subtropical oceans worldwide",
          size: "Up to 1.5m and up to 300kg",
          lifespan: "Over 80 years",
          diet: "Herbivore",
          description: "The green turtle is a large, weighty sea turtle with a wide, smooth carapace, or shell. It inhabits tropical and subtropical coastal waters around the world and has been observed clambering onto land to sunbathe. It is named not for the color of its shell, which is normally brown or olive depending on its habitat, but for the greenish color of its skin. There are two types of green turtles—scientists are currently debating whether they are subspecies or separate species—including the Atlantic green turtle, normally found off the shores of Europe and North America, and the Eastern Pacific green turtle, which has been found in coastal waters from Alaska to Chile."
      },
      {
          type: "Loggerhead Turtle",
          image_url: "http://i.telegraph.co.uk/multimedia/archive/02651/loggerheadTurtle_2651448b.jpg",
          locations: "Tropical and subtropical oceans worldwide",
          size: "90cm, 115kg",
          lifespan: "More than 50 years",
          diet: "Carnivore",
          description: "Loggerhead turtles are the most abundant of all the marine turtle species in U.S. waters. But persistent population declines due to pollution, shrimp trawling, and development in their nesting areas, among other factors, have kept this wide-ranging seagoer on the threatened species list since 1978. Their enormous range encompasses all but the most frigid waters of the world's oceans. They seem to prefer coastal habitats, but often frequent inland water bodies and will travel hundreds of miles out to sea."
      },
      {
          type: "Leatherback Turtle",
          image_url: "https://static-secure.guim.co.uk/sys-images/Guardian/Pix/pictures/2011/8/13/1313246505515/Leatherback-turtle-007.jpg",
          locations: "All tropical and subtropical oceans",
          size: "Up to 2m, up to 900kg",
          lifespan: "45 years",
          diet: "Carnivore",
          description: "Leatherbacks are the largest turtles on Earth, growing up to seven feet (two meters) long and exceeding 2,000 pounds (900 kilograms). These reptilian relics are the only remaining representatives of a family of turtles that traces its evolutionary roots back more than 100 million years. Once prevalent in every ocean except the Arctic and Antarctic, the leatherback population is rapidly declining in many parts of the world. While all other sea turtles have hard, bony shells, the inky-blue carapace of the leatherback is somewhat flexible and almost rubbery to the touch. Ridges along the carapace help give it a more hydrodynamic structure. Leatherbacks can dive to depths of 4,200 feet (1,280 meters)—deeper than any other turtle—and can stay down for up to 85 minutes."
      },
      {
          type: "Hawksbill Sea Turtle",
          image_url: "http://assets.worldwildlife.org/photos/163/images/carousel_small/SCR_290360hawskbill-why-matter-LG.jpg?1345565532",
          locations: "Tropical Coastal areas around the world",
          size: "Over 1m, 45-68kg",
          lifespan: "30-50 Years",
          diet: "Carnivore",
          description: "Dolor possimus voluptas hic aliquam rem doloremque minus maiores accusantium? Laborum perferendis harum blanditiis quod quia? Aspernatur sunt et fuga delectus ab rem excepturi. Ipsa quibusdam facere consequuntur magnam vitae? Consectetur consectetur necessitatibus beatae delectus quibusdam in! Est nobis omnis iusto illum fugiat maxime! Neque fugiat reiciendis sequi corrupti minima facere distinctio aliquam est voluptatibus. Sint incidunt soluta atque ducimus."
      },
      {
          type: "Alligator Snapping Turtle",
          image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Alligator_snapping_turtle_-_Geierschildkr%C3%B6te_-_Alligatorschildkr%C3%B6te_-_Macrochelys_temminckii_01.jpg",
          locations: "Along the Atlantic Coast of USA",
          size: "around 60cm, up to 100kg",
          lifespan: "20-70 years",
          diet: "Carnivore",
          description: "The prehistoric-looking alligator snapping turtle is the largest freshwater turtle in North America and among the largest in the world. With its spiked shell, beaklike jaws, and thick, scaled tail, this species is often referred to as the 'dinosaur of the turtle world.' Found almost exclusively in the rivers, canals, and lakes of the southeastern United States, alligator snappers can live to be 50 to 100 years old. Males average 26 inches (66 centimeters) in shell length and weigh about 175 pounds (80 kilograms), although they have been known to exceed 220 pounds (100 kilograms). The much smaller females top out at around 50 pounds (23 kilograms)."
      },
      {
          type: "Kemp's Ridley Sea Turtle",
          image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Kemp's_Ridley_sea_turtle_nesting.JPG",
          locations: "Coastal areas of the North Atlantic",
          size: "65cm, up to 45kg",
          lifespan: "Around 50 years",
          diet: "Omnivore",
          description: "The Kemp’s ridley turtle is the world’s most endangered sea turtle, and with a worldwide female nesting population roughly estimated at just 1,000 individuals, its survival truly hangs in the balance. Their perilous situation is attributed primarily to the over-harvesting of their eggs during the last century. And though their nesting grounds are protected and many commercial fishing fleets now use turtle excluder devices in their nets, these turtles have not been able to rebound. For this reason, their nesting processions, called arribadas, make for especially high drama. During an arribada, females take over entire portions of beaches, lugging their big bodies through the sand with their flippers until they find a satisfying spot to lay their eggs. Even more riveting is the later struggle to the ocean of each tiny, vulnerable hatchling. Beset by predators, hatchlings make this journey at night, breaking out of their shells using their caruncle, a single temporary tooth grown just for this purpose."
      },
      {
          type: "Olive Ridley Turtle",
          image_url: "http://images.nationalgeographic.com/wpf/media-live/photos/000/006/cache/ridley-sea-turtle_688_600x450.jpg",
          locations: "Tropical coastal areas around the world",
          size: "70cm, 45kg",
          lifespan: "50 years",
          diet: "Omnivore",
          description: "The olive ridley turtle is named for the generally greenish color of its skin and shell, or carapace. It is closely related to the Kemp’s ridley, with the primary distinction being that olive ridleys are found only in warmer waters, including the southern Atlantic, Pacific and Indian Oceans. Olive and Kemp’s ridleys are the smallest of the sea turtles, weighing up to 100 pounds (45 kilograms) and reaching only about 2 feet (65 centimeters) in shell length. The olive ridley has a slightly smaller head and smaller shell than the Kemp’s."
      },
      {
          type: "Eastern Snake Necked Turtle",
          image_url: "https://c1.staticflickr.com/3/2182/2399413165_bcc8031cac_z.jpg?zz=1",
          locations: "Eastern Australia",
          size: "Up to 30cm",
          lifespan: "25 years",
          diet: "Carnivore",
          description: "Snake-necked turtles, as the name suggests, have an unusually long neck. Their necks may be up to 60 percent of their carapace length. Their carapace is oval and flattened, usually dark-brown to black measuring up to 11 inches (27.5 cm) in length. Scutes are shed as the animals grow. The males have a longer, thicker tail than females and a concave plastron. They are excellent swimmers; they have large, webbed feet with sharp claws used to tear apart food."
      }
  ];
  */
})();
