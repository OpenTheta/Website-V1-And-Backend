const fs = require('fs');

const external_url = "https://www.meemopmania.com";

for(let i=1; i<=888; i++){
    fs.readFile('./../../../../OpenThetaProjects/CykoKO/Meemop/Metadata/'+ i +'.json', 'utf8' , (err, data) => {
        data = JSON.parse(data)
        data["external_url"] = external_url
        fs.writeFile('./../../../../OpenThetaProjects/CykoKO/Meemop/MetadataFinal/'+ i +'.json', JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
}
