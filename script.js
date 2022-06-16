window.onload = async () => {
    var charts = document.querySelectorAll(".chart")
    
    var amount = []
    
    try {
        var res = await fetch('data.json')
        
        var data = await res.json()
        
        for(i of data) {
            amount.push(i.amount)
        }
        
        for(j in charts) {
            if(typeof(charts[j]) == "object") {
                var heights = 0
                if(parseInt(amount[j]) > 55) {
                    heights = 150
                }
                heights = parseInt(amount[j]) * 3

                charts[j].style.height = `${heights}px`
            }
        }

        charts.forEach((value, key) => {
            if(amount[key] > 50) {
                //value.style.backgroundColor = "hsl(186, 34%, 60%);"
                value.classList.add('big')
            }
            value.addEventListener('mouseover', () => {
                var att = document.createAttribute("data")
                att.value = `$${amount[key]}`
                value.setAttributeNode(att)
                value.classList.add('addchart')
            })
            value.addEventListener('mouseleave', () => {
                value.classList.remove('addchart')
            })
        })

    } catch (error) {
        console.log(error)
    }
}