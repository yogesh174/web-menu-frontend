import Home from "./routes/Home.svelte";
import NotFound from "./routes/NotFound.svelte";
import List from "./routes/List.svelte";
import Form from "./routes/Form.svelte";

export default {
  "/": Home,
  "/form/*": Form,
  "/list/*": List,
  "*": NotFound,
};
