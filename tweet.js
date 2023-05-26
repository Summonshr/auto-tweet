const axios = require('axios');

const prompt = 'Give me one quotes in less than 240 character.';

axios
    .post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt,
        max_tokens: 500,
        n: 1, // Number of quotes to generate
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Your bearer token here}`,
        },
    })
    .then(response => {
        const quotes = response.data.choices.map(choice => choice.text.trim());
        tweet(quotes[0])
    })
    .catch(error => {
        console.error('Error:', error.response.data.error.message);
    });

function tweet(text) {
    let data = JSON.stringify({
        text
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.twitter.com/2/tweets',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'OAuth oauth_consumer_key="${consumer_key}",oauth_token="${oauth_token}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1685125198",oauth_nonce="fmg6275oVnK",oauth_version="1.0",oauth_signature="dge9mbeTB4IQTkanGqCojqCTQjA%3D"'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}

