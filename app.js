
$(document).ready(function(){
	/*
		Formule service des impots
		Code J ZERBIB
	 */

	function montantIFI($valeur){
		//Don inferieur à 1 300 000
		if ($valeur<1300000) {
			$valeur=0;
			return 0;
		}
		//Don égale a 1 300 000
		else if ($valeur==1300000) {
			$ifi = $valeur*0.005-4000;
			$decote = 17500-($valeur*0.0125);
			$valeur = $ifi-$decote;
			return $valeur;
		}
		//Don supperieur a 1 3000 et inferieur 1 400 000
		else if ($valeur<1400000) {
			$ifi = $valeur*0.007-6600;
			$decote = 17500-($valeur*0.0125);
			$valeur = $ifi-$decote;
			return $valeur;
		}
		//Don inferieur a 2 570 000
		if ($valeur<2570000) {
			$ifi = $valeur*0.007-6600;
			return $ifi;
		}
		//Don inferieur a 5 000 000
		if ($valeur<5000000) {
			$ifi = $valeur*0.01-14310;
			return $ifi;
		}
		//Don inferieur a 10 000 000
		if ($valeur<10000000) {
			$ifi = $valeur*0.0125-26810;
			return $ifi;
		}
		//Don superieur a 10 000 000
		if ($valeur>=10000000) {
			$ifi = $valeur*0.015-51810;
			return $ifi;
		}

	}

	function neutraliserIFI($valeur){
		$ifi = $valeur;
		if ($valeur>=50000) {
			return 66667;
		}else{
			$ifi = $valeur/0.75;
			return $ifi
		}

	}

	function coutDon(){
		$ifiCd = Math.round(montantIFI(patrimoine));

		$neutraliserCd = Math.round(neutraliserIFI(valeurIfi));

		console.log($ifiCd + "neutraliser"+$neutraliserCd);

		if ($ifiCd>=50000) {
			return 16667;
		}else{
			$coutDon = $neutraliserCd - $ifiCd;
			return $coutDon;
		}

	}

	function reductionDeIfi($valeur){
		if ($valeur>=66667) {
			return 50000;
		}else{
			$valeur = Math.round($valeur*0.75); //Valeur du don arrondi.
			$valeurDeMonIFI = Math.round(montantIFI($("#valeurPatrimoine").val()));
			console.log("valeur de mon ifi"+$valeurDeMonIFI);
			if ($valeur>$valeurDeMonIFI) {
				console.log("supperieur don a IFI");
				return $valeurDeMonIFI;
			}
			else if($valeur>=66667){
				return 50000;
			}
			else{
				return $valeur*0.75;
			}
		}
	}

	$("#valeurDon").prop('disabled', true);

		//Appuyer sur le bouton calculer
			$("#valeurPatrimoine").keyup(function(){
				console.log("text");

				patrimoine = $("#valeurPatrimoine").val();
				valeurIfi = Math.round(montantIFI(patrimoine)); //Arrondi
			$("#ifi").html(valeurIfi);
			valeurNeutraliserIfi = Math.round(neutraliserIFI(valeurIfi));
			$("#neutraliserIfi").html(valeurNeutraliserIfi);
			valeurCoutDon = coutDon();
			$("#coutDuDon").html(valeurCoutDon);
			$("#valeurDon").prop('disabled', false);
		});

		$("#valeurDon").keyup(function(){
			valeurDuDon = $("#valeurDon").val();
			reductionifi = reductionDeIfi(valeurDuDon);
			$("#reductionIfi").html(reductionifi);
		})

});