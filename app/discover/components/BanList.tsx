
export default function BanList({
  bannedAttributes, unbanAttribute,}: any) {
  return (
    <div
        style={{ width: "200px", marginLeft: "30px", padding: "15px",
        border: "1px solid lightgray", }}
    >
    
    <h2>Ban List</h2>
    {bannedAttributes.map((item: string)=> (
        <p key= {item} onClick={() => unbanAttribute(item)}>
            {item}
        </p>

    ))}
    </div>
  );
}