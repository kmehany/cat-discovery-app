
export default function BanList({
  bannedAttributes, unbanAttribute,}: any) {
  return (
    <div className="ban-list-box">
      <h2 className="card-title">Ban List</h2>
      <p className="ban-help">Click a banned item to remove it.</p>

      { (bannedAttributes.map((item: string) => (<button key={item}className="ban-item" onClick={() => unbanAttribute(item)}>
            {item}
          </button>
        ))
      )}
    </div>
  );
}