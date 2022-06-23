window.onload = async () => {
    var charts = document.querySelectorAll(".chart")

    var html = document.querySelector("html")

    var date = new Date()
    
    var amount = []

    var font = window.getComputedStyle(html).fontSize

    var num = 150

    font = font.slice(0, -2)
    
    var size = 0

    try {
        var res = await fetch('data.json')
        
        var data = await res.json()
        
        for(i of data) {
            amount.push(i.amount)
            if(i.amount > size) {
                size = i.amount
            }
        }
        
        for(j in charts) {
            if(typeof(charts[j]) == "object") {
                var heights = 0
                if(parseInt(font) == 12) {
                    num = 100
                }
                if(amount[j] == size) {
                    console.log(amount[j], size)
                    heights = num / parseInt(font)
                }
                heights = ((parseFloat(amount[j]) * num) / size) / parseInt(font)

                charts[j].style.height = `${heights}rem`
            }
        }

        charts.forEach((value, key) => {
            if(key == date.getDay() - 1) {
                value.classList.add('big')
            }
            value.addEventListener('mouseover', () => {
                var att = document.createAttribute("data")
                att.value = `$${amount[key]}`
                value.setAttributeNode(att)
                if(key == date.getDay() - 1) {
                    value.classList.remove('chart')
                    value.classList.add('chart2')
                }
                value.classList.add('addchart')
            })
            value.addEventListener('mouseleave', () => {
                if(key == date.getDay() - 1) {
                    value.classList.add('chart')
                    value.classList.remove('chart2')
                }
                value.classList.remove('addchart')
                value.classList.add('chart')
            })
        })

    } catch (error) {
        console.log(error)
    }
}