window.onload = async () => {
    var charts = document.querySelectorAll(".chart")

    var html = document.querySelector("html")
    
    var amount = []

    var font = window.getComputedStyle(html).fontSize

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
                if(parseInt(amount[j]) == size) {
                    heights = 150 / parseInt(font)
                }
                heights = ((parseInt(amount[j]) * 150) / size) / parseInt(font)

                charts[j].style.height = `${heights}rem`
            }
        }

        charts.forEach((value, key) => {
            if(amount[key] == size) {
                value.classList.add('big')
            }
            value.addEventListener('mouseover', () => {
                var att = document.createAttribute("data")
                att.value = `$${amount[key]}`
                value.setAttributeNode(att)
                if(amount[key] == size) {
                    value.classList.remove('chart')
                    value.classList.add('chart2')
                }
                value.classList.add('addchart')
            })
            value.addEventListener('mouseleave', () => {
                if(amount[key] == size) {
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