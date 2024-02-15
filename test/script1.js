var questions = document.querySelectorAll('.answer_table');
questions.forEach(function(question) {
	var noofanswer=question.getAttribute('data-value');
	var rows = question.querySelectorAll('.mtq_clickable');
	
	rows.forEach(function(row) {
		var buttonElement = row.querySelector('.option_index_number');
		var wmarkerElement = row.querySelector('.mtq_wrong_marker');	
		
		row.addEventListener("click",function(){
			const iscorrect = row.getAttribute('data-value');			
			 buttonElement.style.display = "none";
			
			if(iscorrect==1){
				noofanswer=noofanswer-1;
				if(noofanswer==0){
				const questionstamp=row.closest('.answer_table').parentElement.querySelector('.mtq_stamp');
				questionstamp.classList.add("mtq_correct_stamp");
				questionstamp.innerHTML ="Correct";
					Showalltrueans(row);					
				}
			}
			else{
				const questionstamp=row.closest('.answer_table').parentElement.querySelector('.mtq_stamp');
				questionstamp.classList.add("mtq_wrong_stamp");
				questionstamp.innerHTML ="Wrong";

				wmarkerElement.style.display = "block";
				Showalltrueans(row);			
				}
		 });
			 
	 });
 });
function Showalltrueans(rows){
	const correctRows=rows.closest('.answer_table').querySelectorAll('.mtq_correct_marker');
	correctRows.forEach(function(correctRow){			
		var correctButtonElement=correctRow.closest('.mtq_clickable').querySelector('.option_index_number');
		correctButtonElement.style.display = "none"; 
		correctRow.style.display = "block";
		});				
}

//numeric ans check below
const allcheckansbtns=document.querySelectorAll('.checkansbtn');
	allcheckansbtns.forEach(function(checkansbtn){
		checkansbtn.addEventListener("click",function(){
		const minval=checkansbtn.getAttribute("data-value1");
		const maxval=checkansbtn.getAttribute("data-value2");
		const userans=parseFloat(checkansbtn.closest('.numericans').querySelector('.numinputbox').value);
		const resultMessage=checkansbtn.closest('.numericans').querySelector('.result-message');
		const questionstamp=checkansbtn.closest('.numericans').parentElement.querySelector('.mtq_stamp');
		console.log(questionstamp);		
				
		if (!isNaN(userans) && (userans>=minval && userans<=maxval)){
			resultMessage.textContent = "Correct!";
			resultMessage.style.color = "#4caf50";
			questionstamp.classList.add("mtq_correct_stamp");
			questionstamp.innerHTML ="Correct";
		}
		else{
			resultMessage.textContent = "Incorrect. Try again.";
			resultMessage.style.color = "#ff0000"; // Red color for incorrect answer
			questionstamp.classList.add("mtq_wrong_stamp");
			questionstamp.innerHTML ="Wrong";
		}
	});
	
});
