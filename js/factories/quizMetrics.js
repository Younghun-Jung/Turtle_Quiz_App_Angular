(function() {
  // 어떠한 컨트롤러도 접근할 수 있도록 데이터 공유를 위해 설정하는 부분
  // quiz 파트를 show / hide
  // factory에 quizMetrics를 등록
  angular.module("turtleFacts")
  .factory("quizMetrics", QuizMetrics);

  // Quizmetrics에서 DataService의 데이터를 활용하여 채점함수를 만들기 위해 인젝
  QuizMetrics.$inject = ["DataService"];

  function QuizMetrics(DataService) {
    var quizObj = {
      quizActive: false,
      resultsActive: false,
      changeState: changeState,
      correctAnswers: [],
      markQuiz: markQuiz,
      numCorrect: 0
    };

    //quizObj를 다른 컨트롤러에서 사용할 수 있도록 QuizMetrics()를 통해 객체 반환
    return quizObj;

    function changeState(metric, state) {
      if(metric === "quiz") {
          quizObj.quizActive = state;
      }else if(metric === "results") {
        quizObj.resultsActive = state;
      }else {
        return false;
      }
    }

    function markQuiz() {
      quizObj.correctAnswers = DataService.correctAnswers;
      for(var i=0; i < DataService.quizQuestions.length; i++) {
        if (DataService.quizQuestions[i].selected === DataService.correctAnswers[i]) {
          DataService.quizQuestions[i].correct = true;
          quizObj.numCorrect++;
        } else {
          DataService.quizQuestions[i].correct = false;
        }
      }
    }

  }
})();
