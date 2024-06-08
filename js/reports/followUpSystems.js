export const followUpRenderSystems = ( data, root ) => {
    if(data.sistemas.length === 0) return;

    const rootCard = document.createElement('div');

    rootCard.classList.add('card-follow-up');

    root.appendChild(rootCard);
    console.log(data);
}