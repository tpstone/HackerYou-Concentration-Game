// do doc.ready
$(function(){

	// we need to declre the variable that stores all of the images.
	var imagePathArray = [];

	// have cards move around the board randomly  (to make the game different each time)

	var time;

	var playing = false;

	var pairContainer;

	var pairCounter;

	function newGame() {

		imagePathArray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg","img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg"];

		imagePathArray = imagePathArray.sort(function() {
	    	return 0.5 - Math.random();
		});

		for (var i = 1; i < 17; i++) {
			var cardName = "#card" + i + " .back";
			var image = imagePathArray.pop();
			var imgTag = `<img src="assets/${image}" alt="person1">`
			$(cardName).html(imgTag);
		}

		pairContainer = [];

		$('.flipper').removeClass("flipped");
		$('.flipper').removeClass('currentSelection');

		$('.level li').css('background-color', '#e4e4e6');

		time = 0;

		playing = false;

		pairCounter = 0;

		timeSetup();

	}

	newGame();
			
	// we need to "pair" 2 cards so they have relationship (ie same pictuere)
	// we need to have the cards flip when clicked and If they are the same, you get poits, if they are diferent they flip back over.
	// 

	function timeSetup() {
		var seconds = Math.floor(time % 60);
		seconds = ("0" + seconds).slice(-2);
		var minutes = Math.floor(time / 60) % 60;
		minutes = ("0" + minutes).slice(-2);

		$('.seconds .digit').html(seconds);
		$('.minutes .digit').html(minutes);
	}

	$('.popup .playAgain').on('click', function() {
		newGame();
		$('.popup').css('display', 'none');
		// console.log(time);		
	});

	

	$('.level li').on('click', function() {

		if (!playing) {
			if ($(this).html() === 'easy') {
					time = 120;
					$('.level li').css('background-color', '#e4e4e6');
					$(this).css('background-color', 'red')

				} else if ($(this).html() === 'Medium') {
					time = 60;
					$('.level li').css('background-color', '#e4e4e6');
					$(this).css('background-color', 'red')
				} else if ($(this).html() === 'Hard') {
					time = 30;
					$('.level li').css('background-color', '#e4e4e6');
					$(this).css('background-color', 'red')
				}

			timeSetup();
		}
	});

	

	$('.start').on('click', function() {

		if (time !== 0) {

			playing = true;

			var countdown = window.setInterval(function() {

				time -= 1;

				timeSetup();

				if (time <= 0 && pairCounter != 8) {
				   clearInterval(countdown);
				   playing = false;
				   $('.popup').css('display', 'block');
				   $('.popup .messageBoxLoose').css('display', 'block');
				   $('.popup .messageBoxWin').css('display', 'none');
				}

				if (pairCounter == 8) {
					clearInterval(countdown);
				}

		    },1000);


		    $('.card').on('click', function(evt) {

			    evt.stopImmediatePropagation();
		
		    	if ( playing && !$(this).find('.flipper').hasClass("flipped") ) {
			    	$(this).find('.flipper').addClass("flipped currentSelection");
			    	pairContainer.push($(this).find('.back').html());
			    	if (pairContainer.length === 2) {
			    		if (pairContainer[0] === pairContainer[1]) {
			    			pairCounter += 1;
			    			pairContainer = [];
			    			$('.currentSelection').removeClass('currentSelection')
			    		} else {

			    		    pairContainer = []

		    					setTimeout(function() {
		    				       $('.currentSelection').removeClass("flipped");

		    				    }, 400);
			    			
			    		}
			    	}

			    	if (pairCounter == 8) {
			    		clearInterval(countdown);
			    		playing = false;
				    	$('.popup').css('display', 'block');
				  	    $('.popup .messageBoxWin').css('display', 'block');
				  	    $('.popup .messageBoxLoose').css('display', 'none');
				    }

			    }

		    });

			$('.newGame').on('click', function() {
				clearInterval(countdown);
				newGame();	
			});
	    }

	});


});
