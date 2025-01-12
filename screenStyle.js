console.log('screen style')

const styleContainer = document.getElementById("styleContainer")

styleContainer.style="display:flex;flex-wrap:wrap;position:absolute;justify-content:space-between;margin-top:70px"


function genrateScreenStyle()
{
    for(let i=0;i<105;i++)
    {
        if(i%2==0)
        {
            const box = document.createElement('div')
            box.style = 'width:90px;height:90px;box-shadow:5px 5px 10px 2px gray'
            styleContainer.append(box)
        }
        else{
            const box = document.createElement('div')
            box.style = 'width:80px;height:80px;box-shadow:5px 5px 10px 2px gray'
            styleContainer.append(box)
        }
       
    }
}

genrateScreenStyle()