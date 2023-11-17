function getCellValue(col, row) {
  // Function to get cell value to check victory
  const cell = document.getElementById(`cell-${col}-${row}`);

  return cell.getAttribute(attributeName);
}