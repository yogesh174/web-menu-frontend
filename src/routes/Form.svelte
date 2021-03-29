<script>
    import { info, path } from '../stores.js';

    let key = $info.key;
    let input;
    let data = {};

    function loadInputs() {
        let input = $info.inputs;
        console.log(input);
        for (let i=0; i< input.length; i++) {    
            data[input[i].variable] = input[i].default;
        }
        return input;
    }

    input = loadInputs();

    // console.log(data);

    let output;

    async function submitHandler() {
        let new_data = {...data};
        new_data["option"] = key;
        
        console.log(new_data);
        console.log(`http://192.168.93.128/cgi-bin/${$path}/menu.py`);

        let resp = await fetch(
            `http://192.168.93.128/cgi-bin/${$path}/menu.py`,
            {
                method: 'POST',
                body: JSON.stringify(new_data)
            }
        );
        output = await resp.text();
    }
</script>

<div class="container-flex">
    <div class="form">
        <h3 id="option">{key}</h3>

        <form on:submit|preventDefault={submitHandler} > <!-- target='op_frame' -->

            {#await input}
                <p>Fetching Data...</p>
            {:then values}

                {#each values as value (value)}
                    {#if value.name}
                        <p>{value.name}</p>
                        {#if value.type===""}
                            <input class="input-text" type="" bind:value="{data[value.variable]}">
                        <!-- {:else if} -->
                        {/if}
                    {/if}
                {/each}
                
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}

            <br/>

            <button class="btn" type="submit">
                Submit
            </button>

        </form>

    </div>


    <div class="output">
        {#if output}
        <pre>
            {output}
        </pre>
        {/if}
    </div>

</div>


<style>
    /* .container-grid {
        margin: auto;
        display: grid; 
        justify-content: space-around;
        grid-gap: 10px 01px;
        grid-template-columns: 200px 200px;
        padding: 20px;
    } */


    .container-flex {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        /* padding: 20px; */
    }

    #option {
        text-transform: capitalize;
        color: rgb(168, 236, 188);
    }


    .form {
        color: rgb(43, 2, 2);
        display: flex; 
        flex-direction: column;
        align-items: center;
    }

    .output {
        overflow: auto; 
        height: 500px;
        width: 600px;
        background-color: #060F5B;
        color: chartreuse;
    }

    .input-text {
        background-color: #313ca1;
        border-color: darkblue;
        border-radius: 50px;
        width: 250px;
        transition: ease-in-out, width .35s ease-in-out;
    }

    .input-text:focus {
        outline: none;
        width: 270px;
    }

    .btn {
        background-color: #E24054;
        border: none;
        color: white;
        padding: 15px 34px;
        text-align: center;
        font-size: 20px;
        margin: 4px 2px;
        cursor: pointer;
        display: inline-block;
        text-decoration: none;
        border-radius: 20px;
        outline: none;
        border-color: black;
        border-width: 10px;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    }

    .btn:hover {
       background-color: #d83548;
    }
    
</style>