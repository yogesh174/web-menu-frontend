<script>
    export let href, name;
</script>

<a href={href} class="button">{name}</a>

<style>
    a.button {
        background-color: #E24054;
        border: none;
        color: white;
        padding: 20px 34px;
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

    a:hover {
       background-color: #d83548;
    }
</style>