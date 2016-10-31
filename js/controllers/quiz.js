(function() {
  angular.module("turtleFacts")
  .controller("quizCtrl", QuizController);

  QuizController.$inject = ['quizMetrics', 'DataService'];

  function QuizController(quizMetrics, DataService) {
    var vm = this;

    vm.quizMetrics = quizMetrics;
    vm.dataService = DataService;
    vm.activeQuestion = 0;
    vm.questionAnswered = questionAnswered;
    vm.setActiveQuestion = setActiveQuestion;
    vm.selectAnswer = selectAnswer;
    vm.error = false;
    vm.finalise = false;
    vm.finaliseAnswers = finaliseAnswers;

    var numQuestionsAnswered = 0;

    function setActiveQuestion(index) {
      // continue 버튼을 눌러서 순차적 진행을 한 경우(index === undefined)인지 문제 버튼을 눌러서 이동한 경우(index값 존재)인지 검사
      if(index === undefined) {
        var breakOut = false;
        var quizLength = DataService.quizQuestions.length -1;

        while(!breakOut) {
          // 현재 활성화 된 문제가 마지막 문제가 아니면 클릭 버튼을 통해 다음 문제로 갈 수 있고
          // 마지막 문제가 활성화 된 상황이었다면 활성화된 문제 인덱스를 0으로 초기화
          vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

          if(vm.activeQuestion === 0) {
            vm.error = true;
          }
          // 다음 문제가 이미 풀은 문제라면, while문이 한번 더 실행되므로 vm.activeQuestion이 두번 증가된다.(+2)
          // 즉, 클릭 버튼을 눌렀을 때 건너 뛴다.
          // 다음 문제가 풀지 않은 거라면 while문이 해제되므로 vm.activQuestion이 한번만 증가된다.(+1)
          if(DataService.quizQuestions[vm.activeQuestion].selected === null) {
            breakOut = true;
          }
        }
      } else {
        vm.activeQuestion = index;
      }

    }

    // continue 버튼을 눌렀을 때 순차적 진행.
    // 문제 index가 순차적 +1 증가함.
    function questionAnswered() {
      var quizLength = DataService.quizQuestions.length;
      var endFlag = true;

      for(var i=0; i<quizLength; i++) {
        if(DataService.quizQuestions[i].selected === null) {
          endFlag = false;
        }
      }

      if(endFlag) {
        vm.error = false;
        vm.finalise = true;
        return;
      }
      // click 버튼을 누른 직후인 현재의 vm.activeQuestion은 증가 전 상태
      // 현재 vm.activeQuestion에 해당하는 문제를 풀었다면 .selected !== null 이므로 아래의 if문 실행
      // 만약 현재의 문제가 이미 푼 문제라면, click 버튼을 누르더라도 건너뛰기 때문에 아래의 numQuestionsAnswered가 증가되지 않는다.
      // 즉, 버튼을 누른 다음에 풀었는지 안풀었는지 검사하므로, 현재 푼 문제만 numQuestionsAnswered를 증가시킴
      if(DataService.quizQuestions[vm.activeQuestion].selected !== null) {
        // 푼문제 갯수
        numQuestionsAnswered++;
        console.log(numQuestionsAnswered);

        if(numQuestionsAnswered >= quizLength) {
          // filnalise quiz
          for (var i=0; i<quizLength; i++) {
            if(DataService.quizQuestions[i].selected === null) {
              setActiveQuestion(i);
              return;
            }
          }

          vm.error = false;
          vm.finalise = true;
          console.log(vm.finalise);
          return;
        }
      }

      //문제를 푸는동안 continue 버튼을 클릭한 경우, 현재 activeQuestion을 지정하는 함수; index가 없다.
      vm.setActiveQuestion();
    }

    // 고른 선택지를 selected에 할당
    //
    function selectAnswer(index) {
      // 고른 문항을 selected 변수에 할당.
      DataService.quizQuestions[vm.activeQuestion].selected = index;
    }

    // 다 끝마친 후 yes 버튼 눌렀을 떄 호출
    function finaliseAnswers() {
      vm.finalise = false;
      numQuestionsAnswered = 0;
      vm.activeQuestion = 0;
      quizMetrics.markQuiz(); // 채점함수
      quizMetrics.changeState("quiz", false); // 퀴즈 파트 종료
      quizMetrics.changeState("results", true); // 결과 파트 활성
    }
  }
})();
