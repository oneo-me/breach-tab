<script lang="ts">
    export let width: number;
    export let height: number;

    const icon_size = 20;

    let icon_width: number;
    let icon_height: number;

    if (width > height) {
        icon_width = icon_size;
        icon_height = (icon_size * height) / width;
    } else {
        icon_width = (icon_size * width) / height;
        icon_height = icon_size;
    }
</script>

<div class="root" style="width: {icon_size}px; height: {icon_size}px">
    <div class="icon" style="width: {icon_width}px; height: {icon_height}px"></div>
</div>

<style>
    .root {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon {
        border-radius: 4px;
        border: 2px solid rgba(0, 0, 0, 0.5);
    }
</style>
