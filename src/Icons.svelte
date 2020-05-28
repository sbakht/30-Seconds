<style>
  .icons {
    display:flex;
    justify-content: space-between;
    flex-shrink:0;
    padding: 0 8px 5px 8px;
    grid-column: 1/-1;
    align-items: flex-end;
  }

  .icons svg {
    cursor:pointer;
  }
</style>

<script>
  export let add = true;
  export let complete = true;
  export let remove = true;
</script>

<div class="icons">

  {#if add}
  <svg class="add" width="81" height="73" viewBox="0 0 81 73" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="40.5" cy="36.5" rx="40.5" ry="36.5" fill="black" fill-opacity="0.1"/>
  <path d="M48.375 37.625H41.625V44.375H39.375V37.625H32.625V35.375H39.375V28.625H41.625V35.375H48.375V37.625Z" fill="black"/>
  </svg>
  {/if}

  {#if complete}
    <svg clas="complete" width="81" height="73" viewBox="0 0 81 73" fill="none" xmlns="http://www.w3.org/2000/svg">
  }
<ellipse cx="40.5" cy="36.5" rx="40.5" ry="36.5" fill="black" fill-opacity="0.1"/>
<path d="M37.125 41.225L32.4 36.5L30.825 38.075L37.125 44.375L50.625 30.875L49.05 29.3L37.125 41.225Z" fill="black"/>
</svg>
  {/if}
    
    {#if remove}
    <svg class="delete" width="81" height="73" viewBox="0 0 81 73" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M35 44C35 45.1 35.9 46 37 46H45C46.1 46 47 45.1 47 44V32H35V44ZM48 29H44.5L43.5 28H38.5L37.5 29H34V31H48V29Z" fill="black"/>
  <ellipse cx="40.5" cy="36.5" rx="40.5" ry="36.5" fill="black" fill-opacity="0.1"/>
  </svg>
  {/if}
</div>