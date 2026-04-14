#!/bin/bash

# Scroll-to-Top Solution Verification Script
# Run this to verify the implementation is correct

echo "🔍 Verifying Scroll-to-Top Solution..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
PASSED=0
FAILED=0

# Function to check file existence
check_file_exists() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ PASS${NC}: $1 exists"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAIL${NC}: $1 does not exist"
        ((FAILED++))
    fi
}

# Function to check file contains text
check_file_contains() {
    if grep -q "$2" "$1"; then
        echo -e "${GREEN}✅ PASS${NC}: $1 contains '$2'"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAIL${NC}: $1 does not contain '$2'"
        ((FAILED++))
    fi
}

# Function to check file does NOT contain text
check_file_not_contains() {
    if ! grep -q "$2" "$1"; then
        echo -e "${GREEN}✅ PASS${NC}: $1 does not contain '$2' (correct)"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAIL${NC}: $1 contains '$2' (should not)"
        ((FAILED++))
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📁 File Structure Checks"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_file_exists "src/hooks/useScrollToTop.js"
check_file_exists "src/components/Main.jsx"
check_file_exists "src/AnimatedRoutes.jsx"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 Code Quality Checks"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check useScrollToTop.js content
echo ""
echo "Checking useScrollToTop.js:"
check_file_contains "src/hooks/useScrollToTop.js" "useLocation"
check_file_contains "src/hooks/useScrollToTop.js" "lenis.stop()"
check_file_contains "src/hooks/useScrollToTop.js" "immediate: true"
check_file_contains "src/hooks/useScrollToTop.js" "requestAnimationFrame"

# Check Main.jsx content
echo ""
echo "Checking Main.jsx:"
check_file_contains "src/components/Main.jsx" "useScrollToTop"
check_file_contains "src/components/Main.jsx" "import useScrollToTop"
check_file_contains "src/components/Main.jsx" "window.lenis = lenis"
check_file_contains "src/components/Main.jsx" "useScrollToTop()"

# Check AnimatedRoutes.jsx content
echo ""
echo "Checking AnimatedRoutes.jsx:"
check_file_not_contains "src/AnimatedRoutes.jsx" "import ScrollToTop"
check_file_not_contains "src/AnimatedRoutes.jsx" "<ScrollToTop"
check_file_contains "src/AnimatedRoutes.jsx" "Routes"
check_file_contains "src/AnimatedRoutes.jsx" "Main"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"

if [ $FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✨ All checks passed! Implementation looks good.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm run dev"
    echo "2. Test scroll-to-top on navigation"
    echo "3. Check console for errors"
    echo "4. Verify window.lenis exists"
    exit 0
else
    echo ""
    echo -e "${RED}⚠️ Some checks failed. Please review the output above.${NC}"
    echo ""
    echo "Common issues:"
    echo "- Check if files were saved correctly"
    echo "- Check if imports are correct"
    echo "- Check if function calls are present"
    exit 1
fi
