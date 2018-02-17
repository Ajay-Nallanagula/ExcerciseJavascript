  $(document).ready(function () {
            
            var ajaxObj = {
                url: 'Http://agl-developer-test.azurewebsites.net/people.json',
                type: "GET",
                contentType: 'application/json',
                success: function (resp) {
                    
                    var arr = JSON.parse(JSON.stringify(resp));
                    var genderCats = utilityPet(arr,['male','female']);

                    addItemstoHtml(genderCats.male.sort(), genderCats.female.sort());
                },
                error: function (err) {
                    console.log(err)
                }
            };

            $.ajax(ajaxObj);

            var utilityPet = function (arr, gender) {
               
                var returnObj = {};
                for (var i = 0; i < gender.length; i++) {
                    var newArr = [];
                    _.filter(arr, function (item) {
                        if (item.gender.toLowerCase() === gender[i] && item.pets) {
                            _.filter(item.pets, function (pet) {
                                if (pet.type.toLowerCase() === "cat") {
                                    newArr.push(pet.name);
                                }
                            })
                        }
                    });
                    returnObj[gender[i]] = newArr;
                }
                
                return returnObj;
            }

            var addItemstoHtml =  function (male, female) {
                var funct='';
                male.forEach(function (item) {
                    funct= funct+ '<li>' + item + '</li>';
                })
                $("#maleCats").append(funct);
                funct = ''
                female.forEach(function (item) {
                    funct = funct + '<li>' + item + '</li>';
                })
                $("#femaleCats").append(funct)

            }
        });