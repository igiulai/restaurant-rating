interface SortingProps {
  sortOrder: 'asc' | 'desc';
  onSort: () => void;
}

const Sorting = ({ sortOrder, onSort }: SortingProps) => {
  return (
    <button onClick={onSort}>Sort by Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})</button>
  );
};

export default Sorting;